import { useCodeTimerStyles } from "@/styles/codeTimerStyles";
import React, { useEffect } from "react";
import { Text, View } from "react-native";

export default function CodeTimer({
  codeSentIsValid,
  setCodeSentIsValid,
  sentCode,
}) {
  const styles = useCodeTimerStyles();

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCodeSentIsValid((prevValidSeconds) => {
        if (prevValidSeconds <= 1) {
          clearInterval(intervalId);
          return 0;
        }
        return prevValidSeconds - 1;
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, [setCodeSentIsValid]);

  return (
    sentCode && (
      <>
        {codeSentIsValid > 0 ? (
          <View>
            <Text style={styles.text}>{sentCode}</Text>
            <Text style={styles.text}>
              and will expire in{" "}
              <Text style={styles.strong}>{codeSentIsValid} seconds.</Text>
            </Text>
          </View>
        ) : (
          <Text style={styles.text}>Access code has expired.</Text>
        )}
      </>
    )
  );
}
