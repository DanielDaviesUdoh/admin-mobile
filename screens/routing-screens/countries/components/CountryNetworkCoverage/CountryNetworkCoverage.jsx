import FeedbackTwo from "@/components/feedback-two";
import Loading from "@/components/loading";
import RouteLinks from "@/components/route-links/RouteLinks";
import { useSubScreenStyles } from "@/styles/subScreenStyles";
import { useLocalSearchParams } from "expo-router";
import { View } from "react-native";
import { useRoutingCountries } from "../../../../../hooks/useRoutingShared";
import { COLUMNS_CNC } from "../../constants/countriesTHead";
import { useNetworkCoverageByCountryCode } from "../../hooks/useCtryNetCov";
import CountryTable from "../../shared/CountryTable";

const CountryNetworkCoverageScreen = () => {
  const { CountryCode: countryCode } = useLocalSearchParams();
  const styles = useSubScreenStyles();

  const { data, isLoading, isError, statusCode } =
    useNetworkCoverageByCountryCode(countryCode);

  const { data: routingCountries } = useRoutingCountries();
  const countryObj = routingCountries?.find(
    (item) => item.code === countryCode,
  );
  const countryName = countryObj?.name;

  return (
    <View style={styles.cont}>
      {isLoading && <Loading />}
      {isError && <FeedbackTwo statusCode={statusCode} />}
      {!isError && data && (
        <View style={styles.tableCont}>
          <CountryTable
            panelHeading={`${countryName ? countryName : ""} Network Coverage`}
            data={data}
            columns={COLUMNS_CNC}
            captionError={"coverage"}
          />
        </View>
      )}
      <RouteLinks
        navObject={"countries"}
        sParamsName={"CountryCode"}
        sParams={countryCode}
      />
    </View>
  );
};

export default CountryNetworkCoverageScreen;
