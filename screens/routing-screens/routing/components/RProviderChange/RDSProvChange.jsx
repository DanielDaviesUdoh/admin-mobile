import MuiDialogSlide from "@/components/mui-dialogue-slide";
import ProvChangeForm from "./ProvChangeForm";

const RDSProvChange = ({
  data,
  openProvChange,
  closeModalProvChange,
  linkTextProvChange,
  qKey,
  setFetchTrigger,
}) => {
  return (
    <MuiDialogSlide
      component={
        <ProvChangeForm
          data={data}
          linkTextProvChange={linkTextProvChange}
          handleClose={closeModalProvChange}
          qKey={qKey}
          setFetchTrigger={setFetchTrigger}
        />
      }
      isModalOpen={openProvChange}
      handleClose={closeModalProvChange}
    />
  );
};

export default RDSProvChange;
