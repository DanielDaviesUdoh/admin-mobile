import MuiDialogSlide from "@/components/mui-dialogue-slide";
import NPAddForm from "./NPAddForm";

const NPDSAddPrefix = ({
  openAddPrefix,
  closeModalAddPrefix,
  linkTextAddPrefix,
  filteredData,
}) => {
  return (
    <MuiDialogSlide
      component={
        <NPAddForm
          linkTextAddPrefix={linkTextAddPrefix}
          handleClose={closeModalAddPrefix}
          filteredData={filteredData}
        />
      }
      isModalOpen={openAddPrefix}
      handleClose={closeModalAddPrefix}
    />
  );
};

export default NPDSAddPrefix;
