import ScreenWrap from "@/components/screen-wrap";
import CountryRoutingScreen from "@/screens/routing-screens/countries/components/CountryRouting/CountryRouting";

export default function CountryRouting() {
  return (
    <ScreenWrap pageTitle={"Country Routing"}>
      <CountryRoutingScreen />
    </ScreenWrap>
  );
}
