import { getHrefModal } from "@/constants/hrefModal";
import { useCallback, useEffect, useMemo, useState } from "react";
import { ScrollView, SectionList, View } from "react-native";
import {
  COLUMNS_DESIGNATED,
  COLUMNS_LMSGPROV,
  columnsRouting,
} from "../constants/routingTHead";
import {
  useDesgProvData,
  useFetchedData,
  useLongMesgProvData,
} from "../hooks/useRouting";
import RenderRoutingModal from "./RenderRoutingModal";
import RoutingForm from "./RoutingForm";
import RoutingProvidersTH from "./RoutingProvidersTH";
import RoutingProvidersTRows from "./RoutingProvidersTRows";
import RoutingTH from "./RoutingTH";
import RoutingTRows from "./RoutingTRows";

export default function RoutingScreen() {
  const initFieldCtryC = {
    code: "Select country code",
    name: "Select country code",
  };
  const initFieldProv = { provider: "Select provider" };

  const [selectedRadioBtn, setSelectedRadioBtn] = useState("country code");
  const [panelHeading, setPanelHeading] = useState(null);
  const [selectedFCtryCode, setSelectedFCtryCode] = useState(null);
  const [fieldCountryCode, setFieldCountryCode] = useState(initFieldCtryC.code);
  const [fieldPhoneOrPrefix, setFieldPhoneOrPrefix] = useState("");
  const [fieldProvider, setFieldProvider] = useState(initFieldProv.provider);
  const [endpoint, setEndpoint] = useState("");
  const [qKey, setQKey] = useState(null);
  const [fetchTrigger, setFetchTrigger] = useState(false);
  const [modalState, setModalState] = useState({
    npt: { open: false, linkText: "" },
    provChange: { open: false, linkText: "" },
    provDelete: { open: false, linkText: "" },
    otpAdd: { open: false, linkText: "" },
    otpChange: { open: false, linkText: "" },
    otpDelete: { open: false, linkText: "" },
    addNumRouting: { open: false, linkText: "" },
  });

  const { handleHref, closeModal } = useMemo(
    () => getHrefModal(setModalState),
    [setModalState],
  );

  const {
    data: fetchedData,
    isError: isErrorFetchedData,
    isFetching: isFetchingData,
    statusCode: statusCodeFetchedData,
  } = useFetchedData(qKey, endpoint, fetchTrigger);

  const {
    data: desgProvData,
    isError: isErrorDesgProvData,
    isFetching: isFetchingDesgP,
    statusCode: statusCodeDesgProvData,
  } = useDesgProvData(fieldProvider, fetchTrigger);

  const {
    data: longMesgProvData,
    isError: isErrorLongMesgProvData,
    isFetching: isFetchingLongM,
    statusCode: statusCodeLongMesgProvData,
  } = useLongMesgProvData(fieldProvider, fetchTrigger);

  useEffect(() => {
    if (
      !isFetchingData &&
      !isFetchingDesgP &&
      !isFetchingLongM &&
      fetchTrigger
    ) {
      setFetchTrigger(false);
    }
  }, [fetchTrigger, isFetchingData, isFetchingDesgP, isFetchingLongM]);

  const showProgData = isFetchingData;
  const showProgDataDesgPLongM =
    isFetchingData || isFetchingDesgP || isFetchingLongM;

  const memoizedCOLUMNS_ROUTING = useMemo(
    () => columnsRouting(panelHeading, selectedFCtryCode),
    [panelHeading, selectedFCtryCode],
  );

  const handler = useMemo(
    () => ({
      npt: handleHref("npt"),
      provChange: handleHref("provChange"),
      provDelete: handleHref("provDelete"),
      otpAdd: handleHref("otpAdd"),
      otpChange: handleHref("otpChange"),
      otpDelete: handleHref("otpDelete"),
      addNumRouting: handleHref("addNumRouting"),
    }),
    [handleHref],
  );

  const sections = useMemo(
    () => [
      {
        class: "routing",
        panelHeading: `Listing routing by ${panelHeading}`,
        panelHeadingStatus: panelHeading,
        caption: `No routing values found for ${qKey}`,
        data: fetchedData ?? [],
        isError: isErrorFetchedData,
        isFetching: isFetchingData,
        statusCode: statusCodeFetchedData,
        columns: memoizedCOLUMNS_ROUTING,
        errorLocation: panelHeading,
        handleHrefNPT: handler.npt,
        handleHrefProvChange: handler.provChange,
        handleHrefProvDelete: handler.provDelete,
        handleHrefOtpAdd: handler.otpAdd,
        handleHrefOtpChange: handler.otpChange,
        handleHrefOtpDelete: handler.otpDelete,
        handleHrefAddNumRouting: handler.addNumRouting,
      },
      {
        class: "provider",
        panelHeading: "Designated Providers",
        panelHeadingStatus: panelHeading,
        caption: `No Designated Provider found matching ${fieldProvider}`,
        data: desgProvData ?? [],
        isError: isErrorDesgProvData,
        isFetching: isFetchingDesgP,
        statusCode: statusCodeDesgProvData,
        columns: COLUMNS_DESIGNATED,
        errorLocation: "Designated Providers",
      },
      {
        class: "provider",
        panelHeading: "Long Message Providers",
        panelHeadingStatus: panelHeading,
        caption: `No Long Message Provider found matching ${fieldProvider}`,
        data: longMesgProvData ?? [],
        isError: isErrorLongMesgProvData,
        isFetching: isFetchingLongM,
        statusCode: statusCodeLongMesgProvData,
        columns: COLUMNS_LMSGPROV,
        errorLocation: "Long Message Providers",
      },
    ],
    [
      panelHeading,
      qKey,
      fieldProvider,

      fetchedData,
      desgProvData,
      longMesgProvData,

      isErrorFetchedData,
      isFetchingData,
      statusCodeFetchedData,

      isErrorDesgProvData,
      isFetchingDesgP,
      statusCodeDesgProvData,

      isErrorLongMesgProvData,
      isFetchingLongM,
      statusCodeLongMesgProvData,

      memoizedCOLUMNS_ROUTING,
      handler,
    ],
  );

  const filteredSections = useMemo(
    () =>
      panelHeading && panelHeading === "provider"
        ? sections
        : sections.filter((section) => section.class !== "provider"),
    [panelHeading, sections],
  );

  const phonePrefixColor = useCallback((row) => {
    if (
      row?.network_prefix &&
      row?.phone_prefix &&
      row.network_prefix !== row.phone_prefix
    ) {
      return {
        backgroundColor: "#FFB3B3",
      };
    }
    return null;
  }, []);

  const renderHeader = ({ section }) => {
    if (section.class === "routing") {
      return <RoutingTH section={section} />;
    }

    return <RoutingProvidersTH section={section} />;
  };

  const renderRow = useCallback(
    (item, section, index) => {
      if (section.class === "routing") {
        return (
          <RoutingTRows
            row={item}
            previousRow={section.data[index - 1]}
            columns={section.columns}
            altBgStyle={
              index % 2 === 0
                ? {
                    backgroundColor: "#ccc",
                  }
                : null
            }
            rowStyle={phonePrefixColor(item)}
            handleHrefNPT={section.handleHrefNPT}
            handleHrefProvChange={section.handleHrefProvChange}
            handleHrefProvDelete={section.handleHrefProvDelete}
            handleHrefOtpAdd={section.handleHrefOtpAdd}
            handleHrefOtpChange={section.handleHrefOtpChange}
            handleHrefOtpDelete={section.handleHrefOtpDelete}
            handleHrefAddNumRouting={section.handleHrefAddNumRouting}
          />
        );
      }

      return (
        <RoutingProvidersTRows
          row={item}
          columns={section.columns}
          altBgStyle={
            index % 2 === 0
              ? {
                  backgroundColor: "#ccc",
                }
              : null
          }
          rowStyle={phonePrefixColor(item)}
        />
      );
    },
    [phonePrefixColor],
  );

  return (
    <>
      <RoutingForm
        selectedRadioBtn={selectedRadioBtn}
        setSelectedRadioBtn={setSelectedRadioBtn}
        setPanelHeading={setPanelHeading}
        initFieldCtryC={initFieldCtryC}
        initFieldProv={initFieldProv}
        setSelectedFCtryCode={setSelectedFCtryCode}
        fieldCountryCode={fieldCountryCode}
        setFieldCountryCode={setFieldCountryCode}
        fieldPhoneOrPrefix={fieldPhoneOrPrefix}
        setFieldPhoneOrPrefix={setFieldPhoneOrPrefix}
        fieldProvider={fieldProvider}
        setFieldProvider={setFieldProvider}
        setEndpoint={setEndpoint}
        setQKey={setQKey}
        setFetchTrigger={setFetchTrigger}
        showProgData={showProgData}
        showProgDataDesgPLongM={showProgDataDesgPLongM}
      />

      {panelHeading && (
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <SectionList
            sections={filteredSections}
            renderItem={({ item, section, index }) => {
              const lastIndex = section.data.length - 1;

              return (
                <View
                  style={{
                    borderWidth: 1,
                    borderColor: "#337ab7",
                    borderTopWidth: 0,
                    borderBottomWidth: 1,
                    borderBottomColor: index === lastIndex ? "#337ab7" : "#ccc",
                    borderBottomLeftRadius: index === lastIndex ? 4 : 0,
                    borderBottomRightRadius: index === lastIndex ? 4 : 0,
                  }}
                >
                  {renderRow(item, section, index)}
                </View>
              );
            }}
            renderSectionHeader={renderHeader}
            renderSectionFooter={() => <View style={{ height: 24 }} />}
            keyExtractor={(item, index) =>
              item.id?.toString() ?? index.toString()
            }
            stickySectionHeadersEnabled
            initialNumToRender={20}
            maxToRenderPerBatch={20}
            windowSize={10}
            removeClippedSubviews
          />
        </ScrollView>
      )}

      <RenderRoutingModal
        modalState={modalState}
        closeModal={closeModal}
        fetchedData={fetchedData}
        qKey={qKey}
        setFetchTrigger={setFetchTrigger}
      />
    </>
  );
}
