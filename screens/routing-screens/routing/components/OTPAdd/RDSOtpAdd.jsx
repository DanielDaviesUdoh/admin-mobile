import MuiDialogSlide from "@/components/mui-dialogue-slide";
import OtpAddForm from "./OTPAddForm";

const RDSOtpAdd = ({
  data,
  openOtpAdd,
  closeModalOtpAdd,
  linkTextOtpAdd,
  qKey,
  setFetchTrigger,
}) => {
  return (
    <MuiDialogSlide
      component={
        <OtpAddForm
          data={data}
          linkTextOtpAdd={linkTextOtpAdd}
          handleClose={closeModalOtpAdd}
          qKey={qKey}
          setFetchTrigger={setFetchTrigger}
        />
      }
      isModalOpen={openOtpAdd}
      handleClose={closeModalOtpAdd}
    />
  );
};

export default RDSOtpAdd;
