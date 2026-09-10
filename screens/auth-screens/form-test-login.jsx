import RDSTestForm from "@/components/experiment/RDSTestForm";
import { useState } from "react";
import { Button, View } from "react-native";

const Login = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <View>
      <Button title="Open modal" onPress={handleOpen} />
      <RDSTestForm openProvChange={open} closeModalProvChange={handleClose} />
    </View>
  );
};

export default Login;
