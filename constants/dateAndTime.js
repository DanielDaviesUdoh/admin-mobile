export const dateOnly = (datetime) => {
  if (!datetime) return null;

  return datetime.split("T")[0];
};

export const timeOnly = (datetime) => {
  if (!datetime) return null;

  return datetime.split("T")[1].split(":").slice(0, 2).join(":");
};

export const convertTo12HourFormat = (isoString) => {
  if (!isoString) return null;

  const date = new Date(isoString);
  return date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });
};

export const cTo12HrFormatNumsOnly = (isoString) => {
  if (!isoString) return null;
  const getTime = convertTo12HourFormat(isoString);
  const splitGetTime = getTime?.split(" ");
  const getTimeNumsOnly = splitGetTime && splitGetTime[0];
  return getTimeNumsOnly;
};
