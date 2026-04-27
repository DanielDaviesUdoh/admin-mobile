import { OutletContext } from "@/context/outlet-provider"
import { useContext } from "react"

const useOutlet = () => {
  const {setOutletNum} = useContext(OutletContext)
  return {setOutletNum}
}

export default useOutlet