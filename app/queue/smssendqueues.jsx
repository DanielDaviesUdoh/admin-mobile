import ScreenWrap from "@/components/screen-wrap";
import SmsSendQueuesScreen from "@/screens/queue-screens/sms-send-queues/components/SmsSendQueues";

export default function SmsSendQueues() {
  return (
    <ScreenWrap pageTitle={"Send Queues"}>
      <SmsSendQueuesScreen />
    </ScreenWrap>
  );
}
