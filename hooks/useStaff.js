import StaffContext from "@/context/staff-provider";
import { useContext } from "react";

const useStaff = () => {
  const { staff, setStaff } = useContext(StaffContext);
  return { staff, setStaff };
};

export default useStaff;
