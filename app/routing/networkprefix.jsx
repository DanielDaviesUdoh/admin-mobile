import ScreenWrap from "@/components/screen-wrap";
import NetworkPrefixScreen from "@/screens/routing-screens/networkprefix/components/NetworkPrefix";

export default function NetworkPrefix() {
  return (
    <ScreenWrap pageTitle={"Network Prefix"}>
      <NetworkPrefixScreen />
    </ScreenWrap>
  );
}
