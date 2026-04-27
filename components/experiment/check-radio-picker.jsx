import ScreenWrap from "@/components/screen-wrap";
import { colors } from "@/constants/colors";
import { platformFonts } from "@/constants/platform";
// import { Checkbox } from "expo-checkbox";
import { Picker } from "@react-native-picker/picker";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import {
  Checkbox as Checkboxrnp,
  RadioButton,
  TextInput,
  Text as Textrnp,
} from "react-native-paper";

export default function Networklist() {
  const [checkedVals, setCheckedVals] = useState([]);
  const [radioGrp, setRadioGrp] = useState("first");
  const [selected, setSelected] = useState("");
  const [focused, setFocused] = useState(false);
  console.log({ selected });

  const handleToggle = (key) => {
    setCheckedVals((prev) =>
      prev.includes(key) ? prev.filter((v) => v !== key) : [...prev, key]
    );
  };

    // const pickerItems =
    //   items && items?.length > 0 ? (
    //     items.map((item) => <Picker.Item key={item} value={item} label={item} />)
    //   ) : (
    //     <Picker.Item
    //       value={""}
    //       label="Nothing to select"
    //       color={!items || items?.length < 1 ? "red" : undefined}
    //     />
    //   );

  return (
    <ScreenWrap pageTitle={"Networklist"}>
      <View style={styles.container}>
        <Text style={styles.text}>Networklist contents</Text>
        <View
          style={{
            borderWidth: focused ? 1 : 0,
            borderBlockColor: focused ? "purple" : "#ccc",
            height: 50,
          }}
        >
          <Picker
            selectedValue={selected}
            onValueChange={(itemVal) => setSelected(itemVal)}
            mode="dropdown"
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            style={{
              backgroundColor: "#ccc",
              color: "#333",
              height: "100%",
              marginBottom: 20,
            }}
          >
            <Picker.Item value="one" label="one" color="red" />
            <Picker.Item value="two" label="two" style={{ color: "blue" }} />
            <Picker.Item value="three" label="three" />
            <Picker.Item value="one" label="one" color="red" />
            <Picker.Item value="two" label="two" style={{ color: "blue" }} />
            <Picker.Item value="three" label="three" />
            <Picker.Item value="one" label="one" color="red" />
            <Picker.Item value="two" label="two" style={{ color: "blue" }} />
            <Picker.Item value="three" label="three" />
            <Picker.Item value="one" label="one" color="red" />
            <Picker.Item value="two" label="two" style={{ color: "blue" }} />
            <Picker.Item value="three" label="three" />
            <Picker.Item value="one" label="one" color="red" />
            <Picker.Item value="two" label="two" style={{ color: "blue" }} />
            <Picker.Item value="three" label="three" />
            <Picker.Item value="one" label="one" color="red" />
            <Picker.Item value="two" label="two" style={{ color: "blue" }} />
            <Picker.Item value="three" label="three" />
            <Picker.Item value="one" label="one" color="red" />
            <Picker.Item value="two" label="two" style={{ color: "blue" }} />
            <Picker.Item value="three" label="three" />
            <Picker.Item value="one" label="one" color="red" />
            <Picker.Item value="two" label="two" style={{ color: "blue" }} />
            <Picker.Item value="three" label="three" />
            <Picker.Item value="one" label="one" color="red" />
            <Picker.Item value="two" label="two" style={{ color: "blue" }} />
            <Picker.Item value="three" label="three" />
            <Picker.Item value="one" label="one" color="red" />
            <Picker.Item value="two" label="two" style={{ color: "blue" }} />
            <Picker.Item value="three" label="three" />
          </Picker>
        </View>

        <TextInput
          mode="outlined"
          // right={<TextInput.Icon icon={"eye"} />}
          // left={<TextInput.Icon icon={"eye-off"} />}
          // textColor="#fff"
          // style={{
          //   backgroundColor: "green",
          //   height: 50
          // }}
          // outlineStyle={{
          //   borderColor: "black",
          //   borderRadius: 6,
          //   borderWidth: 1,
          // }}
          // contentStyle={{color: "blue", padding: 0}}
          outlineColor="#e34"
          // activeOutlineColor="transparent"
          cursorColor="#000"
        />

        <View
          style={{
            flexDirection: "row",
            columnGap: 4,
            marginBottom: 12,
            alignItems: "center",
          }}
        >
          <Checkboxrnp
            status={checkedVals.includes("terms") ? "checked" : "unchecked"}
            onPress={() => handleToggle("terms")}
            uncheckedColor="blue"
            color={checkedVals.includes("terms") ? "blue" : undefined}
          />
          <Text>Accept terms</Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            columnGap: 4,
            marginBottom: 12,
            alignItems: "center",
          }}
        >
          <View style={{ transform: [{ scale: 1.2 }], marginLeft: 20 }}>
            <Checkboxrnp
              status={checkedVals.includes("pays") ? "checked" : "unchecked"}
              onPress={() => handleToggle("pays")}
              uncheckedColor="blue"
              color={checkedVals.includes("pays") ? "blue" : undefined}
            />
          </View>
          <Text style={{ color: "red" }}>Payment</Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            columnGap: 4,
            marginBottom: 12,
            alignItems: "center",
          }}
        >
          <Checkboxrnp
            status={checkedVals.includes("credits") ? "checked" : "unchecked"}
            onPress={() => handleToggle("credits")}
            uncheckedColor="blue"
            color={checkedVals.includes("credits") ? "blue" : undefined}
          />
          <Text>Credited</Text>
        </View>

        <View
          style={{
            flexDirection: "row",
            columnGap: 4,
            marginBottom: 12,
            alignItems: "center",
          }}
        >
          <View style={{ transform: [{ scale: 1.4 }] }}>
            <RadioButton
              value="first"
              status={radioGrp === "first" ? "checked" : "unchecked"}
              onPress={() => setRadioGrp("first")}
              color={radioGrp === "first" ? "blue" : undefined}
              uncheckedColor="blue"
            />
          </View>
          <Textrnp>First</Textrnp>
        </View>
        <View
          style={{
            flexDirection: "row",
            columnGap: 4,
            marginBottom: 12,
            alignItems: "center",
          }}
        >
          <RadioButton
            value="second"
            status={radioGrp === "second" ? "checked" : "unchecked"}
            onPress={() => setRadioGrp("second")}
            color={radioGrp === "second" ? "blue" : undefined}
            uncheckedColor="blue"
          />
          <Textrnp style={{ fontSize: 14 }}>First</Textrnp>
        </View>
      </View>
    </ScreenWrap>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  text: {
    color: colors.body_text,
    fontSize: 16,
    fontFamily: platformFonts.regular,
  },
});
