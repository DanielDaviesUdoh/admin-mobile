import ScreenWrap from "@/components/screen-wrap";
import ProviderNetworkScreen from "@/screens/routing-screens/provider-network/components/ProviderNetwork";

export default function ProviderNetwork() {
  return (
    <ScreenWrap pageTitle={"Provider Network"}>
      <ProviderNetworkScreen />
    </ScreenWrap>
  );
}
