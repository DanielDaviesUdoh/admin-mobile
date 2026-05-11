import { SOCKET_STATUS } from "@/constants/socketStatus";
import { useQueryClient } from "@tanstack/react-query";
import { useCallback, useEffect, useRef, useState } from "react";
import { useSocket } from "../../../../services/socket/useSocket";

const INDICATOR_SECONDS = 5;

export const useSocketSmsSQ = () => {
  const { status, subscribe } = useSocket();
  const queryClient = useQueryClient();

  const [rowIndicators, setRowIndicators] = useState({});

  const timersRef = useRef({});
  const pendingUpdatesRef = useRef({});

  /**
   * Generate unique row key
   */
  const getRowKey = (row) => {
    return [
      row.date,
      row.provider,
      row.client,
      row.mccmnc,
      row.channel,
      row.priority,
    ].join("-");
  };

  /**
   * Apply queued update
   */
  const applyPendingUpdate = useCallback(
    (rowKey) => {
      const pendingRow = pendingUpdatesRef.current[rowKey];

      if (!pendingRow) return;

      queryClient.setQueryData(["smsSendQueues"], (old = {}) => {
        const currentRows = old.data?.byDate ?? [];

        const updatedRows = currentRows.map((dateGroup) => {
          return {
            ...dateGroup,
            rows: dateGroup.rows.map((row) => {
              const currentKey = getRowKey(row);

              if (currentKey === rowKey) {
                return pendingRow;
              }

              return row;
            }),
          };
        });

        return {
          ...old,
          data: {
            ...old.data,
            byDate: updatedRows,
          },
        };
      });

      delete pendingUpdatesRef.current[rowKey];
    },
    [queryClient],
  );

  /**
   * Start indicator timer
   */
  const startIndicatorTimer = useCallback(
    (rowKey) => {
      if (timersRef.current[rowKey]) return;

      setRowIndicators((prev) => ({
        ...prev,
        [rowKey]: INDICATOR_SECONDS,
      }));

      timersRef.current[rowKey] = setInterval(() => {
        setRowIndicators((prev) => {
          const remaining = prev[rowKey] - 1;

          if (remaining <= 0) {
            clearInterval(timersRef.current[rowKey]);

            delete timersRef.current[rowKey];

            applyPendingUpdate(rowKey);

            const next = { ...prev };
            delete next[rowKey];

            return next;
          }

          return {
            ...prev,
            [rowKey]: remaining,
          };
        });
      }, 1000);
    },
    [applyPendingUpdate],
  );

  /**
   * WebSocket subscription
   */
  useEffect(() => {
    if (status !== SOCKET_STATUS.CONNECTED) return;

    const unsubscribe = subscribe("/topic/queue/count", (message) => {
      const event = JSON.parse(message.body);

      const eventData = event?.data?.byDate ?? [];

      queryClient.setQueryData(["smsSendQueues"], (old = {}) => {
        const currentGroups = old.data?.byDate ?? [];

        let updatedGroups = [...currentGroups];

        eventData.forEach((incomingGroup) => {
          /**
           * Find existing date group
           */
          const existingGroupIndex = updatedGroups.findIndex(
            (g) => g.date === incomingGroup.date,
          );

          /**
           * NEW DATE GROUP
           */
          if (existingGroupIndex === -1) {
            updatedGroups.push(incomingGroup);

            return;
          }

          /**
           * EXISTING DATE GROUP
           */
          const existingGroup = updatedGroups[existingGroupIndex];

          const updatedNestedRows = [...existingGroup.rows];

          incomingGroup.rows.forEach((incomingRow) => {
            const incomingKey = getRowKey(incomingRow);

            const existingRowIndex = existingGroup.rows.findIndex(
              (r) => getRowKey(r) === incomingKey,
            );

            /**
             * NEW PROVIDER ROW
             */
            if (existingRowIndex === -1) {
              updatedNestedRows.push(incomingRow);
              return;
            }

            const existingRow = existingGroup.rows[existingRowIndex];

            /**
             * messageCount changed
             */
            if (existingRow.messageCount !== incomingRow.messageCount) {
              pendingUpdatesRef.current[incomingKey] = incomingRow;

              startIndicatorTimer(incomingKey);
            }
          });

          updatedGroups[existingGroupIndex] = {
            ...existingGroup,
            rows: updatedNestedRows,
          };
        });

        /**
         * sort by date desc
         */
        updatedGroups.sort((a, b) => new Date(b.date) - new Date(a.date));

        return {
          ...old,
          data: {
            ...old.data,
            byDate: updatedGroups,
          },
        };
      });
    });

    return () => unsubscribe?.();
  }, [status, subscribe, queryClient, startIndicatorTimer]);

  /**
   * Cleanup
   */
  useEffect(() => {
    return () => {
      Object.values(timersRef.current).forEach((timer) => clearInterval(timer));

      timersRef.current = {};
    };
  }, []);

  return {
    rowIndicators,
    getRowKey,
  };
};
