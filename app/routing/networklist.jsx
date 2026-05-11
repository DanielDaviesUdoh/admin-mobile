import ScreenWrap from "@/components/screen-wrap";
import NetworkListScreen from "@/screens/routing-screens/networklist/components/NetworkList";

export default function Networklist() {
  return (
    <ScreenWrap pageTitle={"Network List"}>
      <NetworkListScreen />
    </ScreenWrap>
  );
}
