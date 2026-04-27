// import { platformFonts } from "./platform";

// const styles = {
//   fontFamily: platformFonts.regular,
// };

const renderClientIdTitle = (type, obj) => {
  if (type === 1)
    return `${obj["country_name"]} - ${obj["client_id"]} - ${obj["client_name"]}`;
  if (type === 2) return `${obj["client_id"]} - ${obj["client_name"]}`;
  if (type === 3) return `${obj["country_name"]} -  ${obj["client_name"]}`;
  if (type === 4)
    return `${obj["country_name"]} ${obj["client_name"] && "-"} ${
      obj["client_name"]
    }`;
  if (type === 5)
    return `${obj["client_id"]} ${obj["client_name"] && "-"}${" "}${
      obj["client_name"]
    }`;
};

// export const genMenuItems = (data, defaultVal = null) => {
//   const newData = data && defaultVal ? [defaultVal, ...data] : data;
//   const menuItems =
//     newData &&
//     newData.map((value, index) => {
//       return (
//         <Picker.Item key={index} style={styles} value={value} label={value} />
//       );
//     });

//   return menuItems;
// };

// export const genDotMenuItems = (data, dot, defaultVal = null) => {
//   const newData = data && defaultVal ? [defaultVal, ...data] : data;
//   const menuItems =
//     newData &&
//     newData.map((obj, index) => {
//       return (
//         <Picker.Item
//           key={index}
//           style={styles}
//           value={obj[dot]}
//           label={obj[dot]}
//         />
//       );
//     });

//   return menuItems;
// };

// export const getCtryMenuItems = (data, value = "code", defaultVal = null) => {
//   const newData = data && defaultVal ? [defaultVal, ...data] : data;
//   const menuItems =
//     newData &&
//     newData.map((obj) => {
//       return (
//         <Picker.Item
//           key={obj.code}
//           style={styles}
//           value={value === "code" ? obj.code : obj.name}
//           label={
//             defaultVal
//               ? `${obj.name} ${obj.code !== "" ? `(${obj.code})` : obj.code}`
//               : `${obj.name} (${obj.code})`
//           }
//         />
//       );
//     });

//   return menuItems;
// };

// export const getClientIdMenuItems = (data, type, defaultVal = null) => {
//   const newData = data && defaultVal ? [defaultVal, ...data] : data;
//   const menuItems =
//     newData &&
//     newData.map((obj) => {
//       return (
//         <Picker.Item
//           key={obj["client_id"]}
//           style={styles}
//           value={obj["client_id"]}
//           label={renderClientIdTitle(type, obj)}
//         />
//       );
//     });

//   return menuItems;
// };

export const genDataSet = (data = []) => {
  return data.map((value) => ({
    id: value?.toString(),
    title: value?.toString(),
    value: value,
  }));
};

export const genDotDataSet = (data = [], dot) => {
  return data.map((obj) => ({
    id: obj[dot]?.toString(),
    title: obj[dot]?.toString(),
    value: obj[dot],
  }));
};

export const genCtryDataSet = (data = [], value = "code") => {
  return data.map((obj) => ({
    id: obj.code?.toString(),
    title: `${obj.name} (${obj.code})`,
    value: value === "code" ? obj.code : obj.name,
  }));
};

export const genClientIdDataSet = (data = [], type) => {
  return data.map((obj) => ({
    id: obj["client_id"]?.toString(),
    title: renderClientIdTitle(type, obj),
    value: obj["client_id"],
  }));
};
