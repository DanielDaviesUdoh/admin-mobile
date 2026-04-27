import ScreenWrap from "@/components/screen-wrap";
import { colors } from "@/constants/colors";
import { platformFonts } from "@/constants/platform";
import { FlatList, ScrollView, StyleSheet, Text, View } from "react-native";
import AutoCompleteTest from "./auto-complete";

const data = [
  { id: 1, person: "Start", age: "Start", gen: "Start" },
  { id: 2, person: "Ade", age: "12", gen: "male" },
  { id: 2, person: "Ade", age: "12", gen: "male" },
  { id: 2, person: "Ade", age: "12", gen: "male" },
  { id: 2, person: "Ade", age: "12", gen: "male" },
  { id: 2, person: "Ade", age: "12", gen: "male" },
  { id: 2, person: "Ade", age: "12", gen: "male" },
  { id: 2, person: "Ade", age: "12", gen: "male" },
  { id: 2, person: "Ade", age: "12", gen: "male" },
  { id: 2, person: "Ade", age: "12", gen: "male" },
  { id: 2, person: "Ade", age: "12", gen: "male" },
  { id: 2, person: "Ade", age: "12", gen: "male" },
  { id: 2, person: "Ade", age: "12", gen: "male" },
  { id: 2, person: "Ade", age: "12", gen: "male" },
  { id: 2, person: "Ade", age: "12", gen: "male" },
  { id: 2, person: "Ade", age: "12", gen: "male" },
  { id: 2, person: "Ade", age: "12", gen: "male" },
  { id: 2, person: "Ade", age: "12", gen: "male" },
  { id: 2, person: "Ade", age: "12", gen: "male" },
  { id: 2, person: "Ade", age: "12", gen: "male" },
  { id: 2, person: "Ade", age: "12", gen: "male" },
  { id: 2, person: "Ade", age: "12", gen: "male" },
  { id: 2, person: "Ade", age: "12", gen: "male" },
  { id: 2, person: "Ade", age: "12", gen: "male" },
  { id: 2, person: "Ade", age: "12", gen: "male" },
  { id: 2, person: "Ade", age: "12", gen: "male" },
  { id: 2, person: "Ade", age: "12", gen: "male" },
  { id: 2, person: "Ade", age: "12", gen: "male" },
  { id: 2, person: "Ade", age: "12", gen: "male" },
  { id: 2, person: "Ade", age: "12", gen: "male" },
  { id: 2, person: "Ade", age: "12", gen: "male" },
  { id: 2, person: "Ade", age: "12", gen: "male" },
  { id: 3, person: "End", age: "End", gen: "End" },
  { id: 1, person: "Ade", age: "12", gen: "male" },
  { id: 5, person: "End", age: "End", gen: "End" },
];

export default function RoutingTest() {
  const renderItem = ({ item }) => (
    <View style={styles.row}>
      <Text style={[styles.cell, { width: 220 }]}>{item.person}</Text>
      <Text style={[styles.cell, { width: 100 }]}>{item.age}</Text>
      <Text style={[styles.cell, { width: 120 }]}>{item.gen}</Text>
    </View>
  );

  return (
    <ScreenWrap pageTitle={"Routing"}>
      <View style={styles.container}>
        <Text style={styles.text}>Routing contents</Text>
        <AutoCompleteTest />
        <ScrollView>
          <View>
            <ScrollView
              contentContainerStyle={styles.scrollCont}
              horizontal
              showsHorizontalScrollIndicator={true}
            >
              <FlatList
                data={data}
                keyExtractor={(_, index) => index.toString()}
                ListHeaderComponent={() => (
                  <View style={styles.headerRow}>
                    <Text style={[styles.headerCell, { width: 220 }]}>
                      Name
                    </Text>
                    <Text style={[styles.headerCell, { width: 100 }]}>Age</Text>
                    <Text style={[styles.headerCell, { width: 120 }]}>
                      Gender
                    </Text>
                  </View>
                )}
                renderItem={renderItem}
                stickyHeaderIndices={[0]}
                ListFooterComponent={() => (
                  <View>
                    <Text>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      nisi reprehenderit fugiat dolor id dolores officiis minus
                      totam molestias, quam magni tempora impedit natus.
                    </Text>
                    <Text>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      nisi reprehenderit fugiat dolor id dolores officiis minus
                      totam molestias, quam magni tempora impedit natus.
                    </Text>
                    <Text>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      nisi reprehenderit fugiat dolor id dolores officiis minus
                      totam molestias, quam magni tempora impedit natus.
                    </Text>
                    <Text>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      nisi reprehenderit fugiat dolor id dolores officiis minus
                      totam molestias, quam magni tempora impedit natus.
                    </Text>
                    <Text>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      nisi reprehenderit fugiat dolor id dolores officiis minus
                      totam molestias, quam magni tempora impedit natus.
                    </Text>
                  </View>
                )}
              />
            </ScrollView>
          </View>
          <View>
            <ScrollView
              contentContainerStyle={styles.scrollCont}
              horizontal
              showsHorizontalScrollIndicator={true}
            >
              <FlatList
                data={data}
                keyExtractor={(_, index) => index.toString()}
                ListHeaderComponent={() => (
                  <View style={styles.headerRow}>
                    <Text style={[styles.headerCell, { width: 220 }]}>
                      Name
                    </Text>
                    <Text style={[styles.headerCell, { width: 100 }]}>Age</Text>
                    <Text style={[styles.headerCell, { width: 120 }]}>
                      Gender
                    </Text>
                  </View>
                )}
                renderItem={renderItem}
                stickyHeaderIndices={[0]}
                ListFooterComponent={() => (
                  <View>
                    <Text>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      nisi reprehenderit fugiat dolor id dolores officiis minus
                      totam molestias, quam magni tempora impedit natus.
                    </Text>
                    <Text>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      nisi reprehenderit fugiat dolor id dolores officiis minus
                      totam molestias, quam magni tempora impedit natus.
                    </Text>
                    <Text>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      nisi reprehenderit fugiat dolor id dolores officiis minus
                      totam molestias, quam magni tempora impedit natus.
                    </Text>
                    <Text>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      nisi reprehenderit fugiat dolor id dolores officiis minus
                      totam molestias, quam magni tempora impedit natus.
                    </Text>
                    <Text>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      nisi reprehenderit fugiat dolor id dolores officiis minus
                      totam molestias, quam magni tempora impedit natus.
                    </Text>
                  </View>
                )}
              />
            </ScrollView>
          </View>
          <View>
            <ScrollView
              contentContainerStyle={styles.scrollCont}
              horizontal
              showsHorizontalScrollIndicator={true}
            >
              <FlatList
                data={data}
                keyExtractor={(_, index) => index.toString()}
                ListHeaderComponent={() => (
                  <View style={styles.headerRow}>
                    <Text style={[styles.headerCell, { width: 220 }]}>
                      Name
                    </Text>
                    <Text style={[styles.headerCell, { width: 100 }]}>Age</Text>
                    <Text style={[styles.headerCell, { width: 120 }]}>
                      Gender
                    </Text>
                  </View>
                )}
                renderItem={renderItem}
                stickyHeaderIndices={[0]}
                ListFooterComponent={() => (
                  <View>
                    <Text>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      nisi reprehenderit fugiat dolor id dolores officiis minus
                      totam molestias, quam magni tempora impedit natus.
                    </Text>
                    <Text>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      nisi reprehenderit fugiat dolor id dolores officiis minus
                      totam molestias, quam magni tempora impedit natus.
                    </Text>
                    <Text>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      nisi reprehenderit fugiat dolor id dolores officiis minus
                      totam molestias, quam magni tempora impedit natus.
                    </Text>
                    <Text>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      nisi reprehenderit fugiat dolor id dolores officiis minus
                      totam molestias, quam magni tempora impedit natus.
                    </Text>
                    <Text>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      nisi reprehenderit fugiat dolor id dolores officiis minus
                      totam molestias, quam magni tempora impedit natus.
                    </Text>
                  </View>
                )}
              />
            </ScrollView>
          </View>
        </ScrollView>
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
  scrollCont: {
    flexDirection: "column",
    borderWidth: 1,
    borderColor: "green",
    marginBottom: 20,
  },
  headerRow: {
    flexDirection: "row",
    backgroundColor: "#0057ff",
    paddingVertical: 12,
  },
  headerCell: {
    color: "#fff",
    fontWeight: "600",
    paddingHorizontal: 10,
    textAlign: "center",
  },
  row: {
    flexDirection: "row",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: "#ddd",
  },
  cell: {
    paddingHorizontal: 10,
    textAlign: "center",
  },
});
