import ScreenWrap from "@/components/screen-wrap";
import CountriesScreen from "@/screens/routing-screens/countries/components/Countries";
import { useState } from "react";

export default function Routing() {
  const [showBtn, setShowBtn] = useState(false);

  const buttonFunc = () => {
    setShowBtn((prev) => !prev);
  };

  const buttonTitle = showBtn ? "Hide filter" : "Filter";

  return (
    <ScreenWrap
      pageTitle={"Countries"}
      showButton
      buttonTitle={buttonTitle}
      buttonFunc={buttonFunc}
    >
      <CountriesScreen showBtn={showBtn} />
    </ScreenWrap>
  );
}
