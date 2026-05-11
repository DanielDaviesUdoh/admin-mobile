import FeedbackTwo from "@/components/feedback-two";
import Loading from "@/components/loading";
import MuiDialogSlide from "@/components/mui-dialogue-slide";
import RouteLinks from "@/components/route-links/RouteLinks";
import { getHrefModal } from "@/constants/hrefModal";
import { useSubScreenStyles } from "@/styles/subScreenStyles";
import { useLocalSearchParams } from "expo-router";
import { useMemo, useState } from "react";
import { View } from "react-native";
import { useRoutingCountries } from "../../../../../hooks/useRoutingShared";
import { COLUMNS_CN } from "../../constants/countriesTHead";
import { useNetworksByCountryCode } from "../../hooks/useCtryNet";
import CountryTable from "../../shared/CountryTable";
import CNForm from "./CNForm";

const CountryNetworksScreen = () => {
  const [modalState, setModalState] = useState({
    ctryNetworks: { open: false, linkText: "" },
  });
  const { CountryCode: countryCode } = useLocalSearchParams();
  const styles = useSubScreenStyles();

  const { data, isLoading, isError, statusCode } =
    useNetworksByCountryCode(countryCode);
  const { data: routingCountries } = useRoutingCountries();
  const countryObj = routingCountries?.find(
    (item) => item.code === countryCode,
  );
  const countryName = countryObj?.name;

  const { handleHref, closeModal } = useMemo(
    () => getHrefModal(setModalState),
    [setModalState],
  );

  const handleClose = closeModal("ctryNetworks");

  return (
    <View style={styles.cont}>
      {isLoading && <Loading />}
      {isError && <FeedbackTwo statusCode={statusCode} />}
      {!isError && data && (
        <View style={styles.tableCont}>
          <CountryTable
            panelHeading={`${countryName ? countryName : ""} Network(s)`}
            data={data}
            columns={COLUMNS_CN}
            captionError={"network"}
            handleHrefCtryNetworks={handleHref("ctryNetworks")}
          />
        </View>
      )}
      <RouteLinks
        navObject={"countries"}
        sParamsName={"CountryCode"}
        sParams={countryCode}
      />
      {modalState.ctryNetworks.open && (
        <MuiDialogSlide
          component={
            <CNForm
              data={data}
              handleClose={handleClose}
              countryCode={countryCode}
              linkTextCtryNetworks={modalState.ctryNetworks.linkText}
            />
          }
          isModalOpen={modalState.ctryNetworks.open}
          handleClose={handleClose}
        />
      )}
    </View>
  );
};

export default CountryNetworksScreen;
