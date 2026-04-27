export const columnsRouting = (panelHeading, selectedFCtryCode) => {
  if (panelHeading === "country code" && selectedFCtryCode === "234") {
    return [
      { th: "Country", td: "country_name", minWidth: 110 },
      { th: "Network", td: "network", minWidth: 120 },
      { th: "Mccmnc", td: "mccmnc", minWidth: 80 },
      { th: "Prefix", td: "network_prefix", minWidth: 80 },
      { th: "Phone Prefix", td: "phone_prefix", minWidth: 110 },
      { th: "Provider", td: "provider", minWidth: 170 },
      { th: "OTP", td: "otp_provider", minWidth: 60, minWidth2: 210 },
      { th: "BankRoute", td: "bank_route", minWidth: 110 },
      { th: "BankOTP", td: "otp_provider", minWidth: 110 },
      { th: "addNumberR", td: "addNumberR", minWidth: 50 },
    ];
  }
  if (panelHeading === "country code") {
    return [
      { th: "Country", td: "country_name", minWidth: 110 },
      { th: "Network", td: "network", minWidth: 120 },
      { th: "Mccmnc", td: "mccmnc", minWidth: 80 },
      { th: "Prefix", td: "network_prefix", minWidth: 80 },
      { th: "Phone Prefix", td: "phone_prefix", minWidth: 110 },
      { th: "Provider", td: "provider", minWidth: 170 },
      { th: "OTP", td: "otp_provider", minWidth: 60, minWidth_2: 210 },
      { th: "addNumberR", td: "addNumberR", minWidth: 50 },
    ];
  }
  return [
    { th: "Country", td: "country_name", minWidth: 110 },
    { th: "Network", td: "network", minWidth: 120 },
    { th: "Mccmnc", td: "mccmnc", minWidth: 80 },
    { th: "Prefix", td: "network_prefix", minWidth: 80 },
    { th: "Phone Prefix", td: "phone_prefix", minWidth: 110 },
    { th: "Provider", td: "provider", minWidth: 170 },
    { th: "addNumberR", td: "addNumberR", minWidth: 50 },
  ];
};

export const COLUMNS_DESIGNATED = [
  { th: "Client Id", td: "client_id", minWidth: 110 },
  { th: "Mccmnc", td: "mccmnc", minWidth: 110 },
  { th: "Designated Provider", td: "designated_provider", minWidth: 110 },
];

export const COLUMNS_LMSGPROV = [
  { th: "Provider", td: "provider", minWidth: 110 },
  { th: "Long Msg Provider", td: "over_160_char_provider", minWidth: 110 },
  { th: "Mccmnc", td: "mccmnc", minWidth: 110 },
  { th: "Message Length", td: "msg_len", minWidth: 110 },
];
