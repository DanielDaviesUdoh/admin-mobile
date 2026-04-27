import ScreenWrap from "@/components/screen-wrap";
import CountryNetworkPrefixScreen from "@/screens/routing-screens/countries/components/CountryNetworkPrefix/CountryNetworkPrefix";

export default function NetworkPrefix() {
  return (
    <ScreenWrap pageTitle={"Network Prefix"}>
      <CountryNetworkPrefixScreen />
    </ScreenWrap>
  );
}
