import ScreenWrap from "@/components/screen-wrap";
import PreferredProviderScreen from "@/screens/routing-screens/preferred-provider/components/PreferredProvider";

export default function PreferredProvider() {
  return (
    <ScreenWrap pageTitle={"Preferred Provider"}>
      <PreferredProviderScreen />
    </ScreenWrap>
  );
}
