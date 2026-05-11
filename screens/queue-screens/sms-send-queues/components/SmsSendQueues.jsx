import FeedbackTwo from "@/components/feedback-two";
import Loading from "@/components/loading";
import React from "react";
import { View } from "react-native";
import { COLUMNS_SMSSQ } from "../constants/smsSQTHead";
import { useSmsSendQueues } from "../hooks/useSmsSendQueues";
import { useSocketSmsSQ } from "../hooks/useSocketSmsSQ";
import SmsSQTable from "./SmsSQTable";

export default function SmsSendQueuesScreen() {
  const { data, isLoading, isError, statusCode } = useSmsSendQueues();
  const dataByDate = data?.byDate ?? [];

  const { rowIndicators, getRowKey } = useSocketSmsSQ();

  return (
    <View>
      {isLoading && <Loading />}
      {isError && <FeedbackTwo statusCode={statusCode} />}

      <SmsSQTable
        panelHeading={"Queues"}
        data={dataByDate}
        columns={COLUMNS_SMSSQ}
        rowIndicators={rowIndicators}
        getRowKey={getRowKey}
      />
    </View>
  );
}
