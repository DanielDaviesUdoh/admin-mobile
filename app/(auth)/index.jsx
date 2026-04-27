import AccessCodeScreen from "@/screens/auth-screens/access-code";
import LoginScreen from "@/screens/auth-screens/login";
import { useState } from "react";

export default function Auth() {
  const [accessCode, setAccessCode] = useState(false);
  return accessCode ? (
    <AccessCodeScreen />
  ) : (
    <LoginScreen setAccessCode={setAccessCode} />
  );
}
