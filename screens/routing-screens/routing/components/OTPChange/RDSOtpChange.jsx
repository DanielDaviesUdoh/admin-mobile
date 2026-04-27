import MuiDialogSlide from "@/components/mui-dialogue-slide";
import OtpChangeForm from "./OtpChangeForm";

const RDSOtpChange = ({
  data,
  openOtpChange,
  closeModalOtpChange,
  linkTextOtpChange,
  qKey,
  setFetchTrigger,
}) => {
  return (
    <MuiDialogSlide
      component={
        <OtpChangeForm
          data={data}
          linkTextOtpChange={linkTextOtpChange}
          handleClose={closeModalOtpChange}
          qKey={qKey}
          setFetchTrigger={setFetchTrigger}
        />
      }
      isModalOpen={openOtpChange}
      handleClose={closeModalOtpChange}
    />
  );
};

export default RDSOtpChange;
