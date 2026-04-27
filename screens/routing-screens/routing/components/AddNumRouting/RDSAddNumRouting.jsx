import MuiDialogSlide from "@/components/mui-dialogue-slide";
import AddNumRForm from "./AddNumRForm";

const RDSAddNumRouting = ({
  data,
  openAddNumRouting,
  closeModalAddNumRouting,
  linkTextAddNumRouting,
  qKey,
  setFetchTrigger,
}) => {
  return (
    <MuiDialogSlide
      component={
        <AddNumRForm
          data={data}
          linkTextAddNumRouting={linkTextAddNumRouting}
          handleClose={closeModalAddNumRouting}
          qKey={qKey}
          setFetchTrigger={setFetchTrigger}
        />
      }
      isModalOpen={openAddNumRouting}
      handleClose={closeModalAddNumRouting}
    />
  );
};

export default RDSAddNumRouting;
