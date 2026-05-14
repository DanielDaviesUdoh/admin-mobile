import ScreenWrap from "@/components/screen-wrap";
import RoutingLogScreen from "@/screens/routing-screens/routing-log/components/RoutingLog";
import { useState } from "react";

export default function RoutingLog() {
  const [showBtn, setShowBtn] = useState(false);

  const buttonFunc = () => {
    setShowBtn((prev) => !prev);
  };

  const buttonTitle = showBtn ? "Hide filter" : "Filter";

  return (
    <ScreenWrap
      pageTitle={"Routing Log"}
      showButton
      buttonTitle={buttonTitle}
      buttonFunc={buttonFunc}
    >
      <RoutingLogScreen showBtn={showBtn} />
    </ScreenWrap>
  );
}
