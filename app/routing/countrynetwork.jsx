import ScreenWrap from "@/components/screen-wrap";
import CountryNetworksScreen from "@/screens/routing-screens/countries/components/CountryNetworks/CountryNetworks";

export default function CountryNetworks() {
  return (
    <ScreenWrap pageTitle={"Country Networks"}>
      <CountryNetworksScreen />
    </ScreenWrap>
  );
}
