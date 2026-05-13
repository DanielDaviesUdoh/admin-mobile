import CRadioButton from "@/components/radio-button";
import { Text, View } from "react-native";
import { usePreferredPStyles } from "../styles/preferredPStyles";

const PPRadioButtons = ({ radioValue, setRadioValue }) => {
  const styles = usePreferredPStyles();

  return (
    <View style={styles.rbuttonsCont}>
      <Text style={styles.radioTitle} className="radio-title">
        Select Provider Type:
      </Text>
      <View style={styles.radioCont} className="radio-cont">
        <CRadioButton
          value="unmatched"
          status={radioValue === "unmatched"}
          onPress={() => setRadioValue("unmatched")}
          text="Unmatched"
          textStyle={styles.radioBText}
        />
        <CRadioButton
          value="all"
          status={radioValue === "all"}
          onPress={() => setRadioValue("all")}
          text="All"
          textStyle={styles.radioBText}
        />
      </View>
    </View>
  );
};

export default PPRadioButtons;
