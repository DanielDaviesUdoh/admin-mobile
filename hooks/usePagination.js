import { useMemo } from "react";

export function usePagination({ data, currentPage, itemsPerPage }) {
  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const paginatedData = useMemo(
    () => data?.slice(startIndex, endIndex),
    [data, startIndex, endIndex],
  );

  return {
    paginatedData,
    totalItems: data?.length,
    startIndex,
    endIndex,
  };
}
