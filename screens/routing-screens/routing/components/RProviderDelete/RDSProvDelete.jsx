import MuiDialogSlide from "@/components/mui-dialogue-slide";
import ProvDeleteForm from "./ProvDeleteForm";

const RDSProvDelete = ({
  data,
  openProvDelete,
  closeModalProvDelete,
  linkTextProvDelete,
  qKey,
  setFetchTrigger,
}) => {
  return (
    <MuiDialogSlide
      component={
        <ProvDeleteForm
          data={data}
          linkTextProvDelete={linkTextProvDelete}
          handleClose={closeModalProvDelete}
          qKey={qKey}
          setFetchTrigger={setFetchTrigger}
        />
      }
      isModalOpen={openProvDelete}
      handleClose={closeModalProvDelete}
    />
  );
};

export default RDSProvDelete;
