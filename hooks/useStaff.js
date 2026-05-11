import StaffContext from "@/context/staff-provider";
import { useContext } from "react";

const useStaff = () => {
  const context = useContext(StaffContext);

  if (!context) {
    throw new Error("useStaff must be used within StaffProvider");
  }

  const { staff, setStaff } = context;

  return { staff, setStaff };
};

export default useStaff;
