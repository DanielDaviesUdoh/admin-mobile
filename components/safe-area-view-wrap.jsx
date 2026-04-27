import { SafeAreaView } from "react-native-safe-area-context";

export default function SafeAreaViewWrap({ children }) {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      {children}
    </SafeAreaView>
  );
}
