import ScreenWrap from "@/components/screen-wrap";
import { colors } from "@/constants/colors";
import { platformFonts } from "@/constants/platform";
import { useResponsive } from "@/hooks/useResponsive";
import { useState } from "react";
import {
  Modal,
  Pressable,
  ScrollView,
  SectionList,
  StyleSheet,
  Text,
  View,
} from "react-native";

const data1 = [
  { name: "Ade", gender: "Male", age: 20 },
  { name: "Ade", gender: "Male", age: 20 },
  { name: "Ade", gender: "Male", age: 20 },
  { name: "Ade", gender: "Male", age: 20 },
  { name: "Ade", gender: "Male", age: 20 },
  { name: "Ade", gender: "Male", age: 20 },
  { name: "Ade", gender: "Male", age: 20 },
  { name: "Ade", gender: "Male", age: 20 },
  { name: "Ade", gender: "Male", age: 20 },
];

const data2 = [
  { class: "carbs", nutr: "energy", qty: "small" },
  { class: "carbs", nutr: "energy", qty: "small" },
  { class: "carbs", nutr: "energy", qty: "small" },
  { class: "carbs", nutr: "energy", qty: "small" },
  { class: "carbs", nutr: "energy", qty: "small" },
  { class: "carbs", nutr: "energy", qty: "small" },
  { class: "carbs", nutr: "energy", qty: "small" },
  { class: "carbs", nutr: "energy", qty: "small" },
  { class: "carbs", nutr: "energy", qty: "small" },
  { class: "carbs", nutr: "energy", qty: "small" },
  { class: "carbs", nutr: "energy", qty: "small" },
  { class: "Last", nutr: "Last", qty: "last" },
];

const sections = [
  {
    title: "Table 1",
    column: { name: "Name", gender: "Gender", age: "Age" },
    data: data1.map((obj, index) => ({
      ...obj,
      id: `${obj.age}_${obj.gender}_${index}`,
    })),
  },
  {
    title: "Table 2",
    column: { class: "Class", nutr: "Nutr", qty: "Qty" },
    data: data2.map((obj, index) => ({
      ...obj,
      id: `${obj.class}_${obj.nutr}_${index}`,
    })),
  },
];

export default function Routing() {
  const [showModal, setShowModal] = useState(false);
  const [cell, setCell] = useState(null);
  const { isTablet } = useResponsive();

  return (
    <ScreenWrap pageTitle={"Countries"}>
      <View style={styles.container}>
        <Text style={styles.text}>Countries contents</Text>
        <Pressable onPress={() => setShowModal(true)}>
          <Text>Show modal</Text>
        </Pressable>
        <View style={{ flex: 1 }}>
          <ScrollView horizontal>
            <SectionList
              stickySectionHeadersEnabled
              sections={sections}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ paddingBottom: 40 }}
              keyExtractor={(item) => item.id}
              renderSectionHeader={({ section }) => (
                <View
                  style={[
                    styles.headRow,
                    { marginTop: section.title === "Table 1" ? 0 : 50 },
                  ]}
                >
                  {Object.values(section.column).map((v, idx) => (
                    <Text style={styles.headCell} key={`${v}_${idx}`}>
                      {v}
                    </Text>
                  ))}
                </View>
              )}
              renderItem={({ item, section }) => (
                <View style={styles.bodyRow}>
                  {Object.keys(section.column).map((v, idx) => {
                    if (v === "name")
                      return (
                        <Pressable
                          hitSlop={20}
                          style={[styles.bodyCell, { alignItems: "center" }]}
                          key={`${v}_${idx}`}
                          onPress={() => {
                            setCell(item[v]);
                            setShowModal(true);
                          }}
                        >
                          <Text>{item[v]}</Text>
                        </Pressable>
                      );

                    return (
                      <Text style={styles.bodyCell} key={`${v}_${idx}`}>
                        {item[v]}
                      </Text>
                    );
                  })}
                </View>
              )}
            />
          </ScrollView>
        </View>

        <Modal
          visible={showModal}
          animationType="slide"
          onRequestClose={() => setShowModal(false)}
          transparent
        >
          <Pressable style={styles.overlay} onPress={() => setShowModal(false)}>
            <View
              style={[
                styles.modalBox,
                {
                  width: isTablet ? "60%" : "90%",
                  maxWidth: isTablet ? 600 : 500,
                },
              ]}
            >
              <ScrollView>
                <Pressable>
                  <Text style={{ marginBottom: 20 }}>Modal</Text>
                  <Text style={{ marginBottom: 20 }}>
                    {cell ? `Selected cell - ${cell}` : "No cell selected yet"}
                  </Text>
                  <Pressable
                    style={{ alignSelf: "flex-start" }}
                    onPress={() => setShowModal(false)}
                  >
                    <Text>Close modal</Text>
                  </Pressable>
                </Pressable>
              </ScrollView>
            </View>
          </Pressable>
        </Modal>
      </View>
    </ScreenWrap>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  overlay: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalBox: {
    minWidth: 280,
    maxHeight: "80%",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 12,
  },
  text: {
    color: colors.body_text,
    fontSize: 16,
    fontFamily: platformFonts.regular,
    marginBottom: 10,
  },
  headRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    borderTopWidth: 1,
    borderTopColor: "#ccc",
    marginTop: 24,
    backgroundColor: "rgba(25, 25, 243, 1)",
  },
  headCell: {
    width: 130,
    textAlign: "center",
    fontSize: 14,
    fontWeight: "bold",
    color: "#fff",
  },
  bodyRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  bodyCell: {
    width: 130,
    textAlign: "center",
    fontSize: 14,
  },
});
