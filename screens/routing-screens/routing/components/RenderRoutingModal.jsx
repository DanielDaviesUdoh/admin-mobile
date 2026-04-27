import RDSAddNumRouting from "./AddNumRouting/RDSAddNumRouting";
import RDSOtpAdd from "./OTPAdd/RDSOtpAdd";
import RDSOtpChange from "./OTPChange/RDSOtpChange";
import RDSOtpDelete from "./OTPDelete/RDSOtpDelete";
import RDSNetworkPriceTable from "./RDSNetworkPriceTable";
import RDSProvChange from "./RProviderChange/RDSProvChange";
import RDSProvDelete from "./RProviderDelete/RDSProvDelete";

const RenderRoutingModal = (props) => {
  const { modalState, closeModal, fetchedData, qKey, setFetchTrigger } = props;
  return (
    <>
      {modalState.npt.open && (
        <RDSNetworkPriceTable
          linkTextNPT={modalState.npt.linkText}
          closeModalNPT={closeModal("npt")}
          openNPT={modalState.npt.open}
        />
      )}

      {modalState.provChange.open && (
        <RDSProvChange
          data={fetchedData}
          openProvChange={modalState.provChange.open}
          closeModalProvChange={closeModal("provChange")}
          linkTextProvChange={modalState.provChange.linkText}
          qKey={qKey}
          setFetchTrigger={setFetchTrigger}
        />
      )}

      {modalState.provDelete.open && (
        <RDSProvDelete
          data={fetchedData}
          openProvDelete={modalState.provDelete.open}
          closeModalProvDelete={closeModal("provDelete")}
          linkTextProvDelete={modalState.provDelete.linkText}
          qKey={qKey}
          setFetchTrigger={setFetchTrigger}
        />
      )}

      {modalState.otpAdd.open && (
        <RDSOtpAdd
          data={fetchedData}
          openOtpAdd={modalState.otpAdd.open}
          closeModalOtpAdd={closeModal("otpAdd")}
          linkTextOtpAdd={modalState.otpAdd.linkText}
          qKey={qKey}
          setFetchTrigger={setFetchTrigger}
        />
      )}

      {modalState.otpChange.open && (
        <RDSOtpChange
          data={fetchedData}
          openOtpChange={modalState.otpChange.open}
          closeModalOtpChange={closeModal("otpChange")}
          linkTextOtpChange={modalState.otpChange.linkText}
          qKey={qKey}
          setFetchTrigger={setFetchTrigger}
        />
      )}

      {modalState.otpDelete.open && (
        <RDSOtpDelete
          data={fetchedData}
          openOtpDelete={modalState.otpDelete.open}
          closeModalOtpDelete={closeModal("otpDelete")}
          linkTextOtpDelete={modalState.otpDelete.linkText}
          qKey={qKey}
          setFetchTrigger={setFetchTrigger}
        />
      )}

      {modalState.addNumRouting.open && (
        <RDSAddNumRouting
          data={fetchedData}
          openAddNumRouting={modalState.addNumRouting.open}
          closeModalAddNumRouting={closeModal("addNumRouting")}
          linkTextAddNumRouting={modalState.addNumRouting.linkText}
          qKey={qKey}
          setFetchTrigger={setFetchTrigger}
        />
      )}
    </>
  );
};

export default RenderRoutingModal;
