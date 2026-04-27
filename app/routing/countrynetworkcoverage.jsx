import ScreenWrap from "@/components/screen-wrap";
import CountryNetworkCoverageScreen from "@/screens/routing-screens/countries/components/CountryNetworkCoverage/CountryNetworkCoverage";

export default function CountryNetworkCoverage() {
  return (
    <ScreenWrap pageTitle={"Country Network Coverage"}>
      <CountryNetworkCoverageScreen />
    </ScreenWrap>
  );
}
