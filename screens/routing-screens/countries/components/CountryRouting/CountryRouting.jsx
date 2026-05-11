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
  useRoutingActiveProviders,
  useRoutingCountries,
} from "../../../../../hooks/useRoutingShared";
import { COLUMNS_CR } from "../../constants/countriesTHead";
import { useRoutingByCountry } from "../../hooks/useCtryRouting";
import CountryTable from "../../shared/CountryTable";
import CRForm from "./CRForm";

const CountryRoutingScreen = () => {
  const [modalState, setModalState] = useState({
    ctryRoute: { open: false, linkText: "" },
  });
  const { CountryCode: countryCode } = useLocalSearchParams();
  const styles = useSubScreenStyles();

  const { data, isLoading, isError, statusCode } =
    useRoutingByCountry(countryCode);

  const { data: providerData } = useRoutingActiveProviders();
  const { data: routingCountries } = useRoutingCountries();
  const countryObj = routingCountries?.find(
    (item) => item.code === countryCode,
  );
  const countryName = countryObj?.name;

  const { handleHref, closeModal } = useMemo(
    () => getHrefModal(setModalState),
    [setModalState],
  );

  const handleClose = closeModal("ctryRoute");

  return (
    <View style={styles.cont}>
      {isLoading && <Loading />}
      {isError && <FeedbackTwo statusCode={statusCode} />}
      {!isError && data && (
        <View style={styles.tableCont}>
          <CountryTable
            panelHeading={`${countryName ? countryName : ""} Routing`}
            data={data}
            columns={COLUMNS_CR}
            captionError={"routing"}
            handleHrefCtryRoute={handleHref("ctryRoute")}
          />
        </View>
      )}
      <RouteLinks
        navObject={"countries"}
        sParamsName={"CountryCode"}
        sParams={countryCode}
      />
      {modalState.ctryRoute.open && (
        <MuiDialogSlide
          component={
            <CRForm
              data={data}
              handleClose={handleClose}
              providerData={providerData}
              countryCode={countryCode}
              linkTextCtryRoute={modalState.ctryRoute.linkText}
            />
          }
          isModalOpen={modalState.ctryRoute.open}
          handleClose={handleClose}
        />
      )}
    </View>
  );
};

export default CountryRoutingScreen;
