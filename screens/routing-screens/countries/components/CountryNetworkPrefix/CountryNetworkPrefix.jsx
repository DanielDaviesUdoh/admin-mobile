import FeedbackTwo from "@/components/feedback-two";
import Loading from "@/components/loading";
import MuiDialogSlide from "@/components/mui-dialogue-slide";
import RouteLinks from "@/components/route-links/RouteLinks";
import { getHrefModal } from "@/constants/hrefModal";
import { useSubScreenStyles } from "@/styles/subScreenStyles";
import { useLocalSearchParams } from "expo-router";
import { useMemo, useState } from "react";
import { View } from "react-native";
import {
  useNetworkPrefixByCountryCode,
  useRoutingCountries,
} from "../../../../../hooks/useRoutingShared";
import { COLUMNS_CNP } from "../../constants/countriesTHead";
import CountryTable from "../../shared/CountryTable";
import CNPForm from "./CNPForm";

const CountryNetworkPrefixScreen = () => {
  const [modalState, setModalState] = useState({
    ctryNetworkPrefix: { open: false, linkText: "" },
  });
  const { CountryCode: countryCode } = useLocalSearchParams();
  const styles = useSubScreenStyles();

  const {
    data: nPCCodeData,
    isLoading,
    isError,
    statusCode,
  } = useNetworkPrefixByCountryCode(countryCode);

  const { data: routingCountries } = useRoutingCountries();
  const countryObj = routingCountries?.find(
    (item) => item.code === countryCode,
  );
  const countryName = countryObj?.name;

  const { handleHref, closeModal } = useMemo(
    () => getHrefModal(setModalState),
    [setModalState],
  );

  const handleClose = closeModal("ctryNetworkPrefix");

  return (
    <View style={styles.cont}>
      {isLoading && <Loading />}
      {isError && <FeedbackTwo statusCode={statusCode} />}
      {!isError && nPCCodeData && (
        <View style={styles.tableCont}>
          <CountryTable
            panelHeading={`${countryName ? countryName : ""} Network Prefixes`}
            data={nPCCodeData}
            columns={COLUMNS_CNP}
            captionError={"network prefix"}
            handleHrefCtryNetworkPrefix={handleHref("ctryNetworkPrefix")}
          />
        </View>
      )}
      <RouteLinks
        navObject={"countries"}
        sParamsName={"CountryCode"}
        sParams={countryCode}
      />
      {modalState.ctryNetworkPrefix.open && (
        <MuiDialogSlide
          component={
            <CNPForm
              data={nPCCodeData}
              handleClose={handleClose}
              countryCode={countryCode}
              linkTextCtryNetworkPrefix={modalState.ctryNetworkPrefix.linkText}
            />
          }
          isModalOpen={modalState.ctryNetworkPrefix.open}
          handleClose={handleClose}
        />
      )}
    </View>
  );
};

export default CountryNetworkPrefixScreen;
