import MuiDialogSlide from "@/components/mui-dialogue-slide";
import TestForm from "./TestForm";

const RDSTestForm = ({ openProvChange, closeModalProvChange }) => {
  return (
    <MuiDialogSlide
      component={<TestForm handleClose={closeModalProvChange} />}
      isModalOpen={openProvChange}
      handleClose={closeModalProvChange}
    />
  );
};

export default RDSTestForm;
