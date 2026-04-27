import MuiDialogSlide from "@/components/mui-dialogue-slide";
import OTPDeleteForm from "./OTPDeleteForm";

const RDSOtpDelete = ({
  data,
  openOtpDelete,
  closeModalOtpDelete,
  linkTextOtpDelete,
  qKey,
  setFetchTrigger,
}) => {
  return (
    <MuiDialogSlide
      component={
        <OTPDeleteForm
          data={data}
          linkTextOtpDelete={linkTextOtpDelete}
          handleClose={closeModalOtpDelete}
          qKey={qKey}
          setFetchTrigger={setFetchTrigger}
        />
      }
      isModalOpen={openOtpDelete}
      handleClose={closeModalOtpDelete}
    />
  );
};

export default RDSOtpDelete;
