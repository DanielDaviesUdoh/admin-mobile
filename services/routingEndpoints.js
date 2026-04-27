export const STAFF_LOGIN = "/staff/login";
export const SEND_CODE = "/staff/send-code";
export const STAFF_AUTH = "/staff/auth";
export const ROUTING_LISTING_ALL = "/routing/listing/all";
export const ROUTING_COUNTRIES = "/routing/countries";
export const ROUTING_ACTIVEPROVIDERS = "/routing/active-providers";
export const ROUTING_BY_COUNTRY = "/routing/listing/country?country-code=";
export const ROUTING_BY_PREFIX = "/routing/listing/prefix?prefix=";
export const ROUTING_BY_PROVIDER = "/routing/listing/provider?provider=";
export const ROUTING_CHANGE_REASON = "/routing/change-reason";
export const ROUTING_CHANGE_PROVIDER =
  "/routing/provider/routing-provider?phone-prefix=";
export const ROUTING_SUBMIT_CHANGE_PROVIDER = "/routing/provider";
export const ROUTING_DELETE_CHANGE_PROVIDER = "/routing/provider/";
// ROUTING_CHANGE_OTP_PROVIDER is used to get the select dropdown for both AddOTP and ChangeOTP.
// For AddOTP just pass only the 'phonePrefix' while for ChangeOTP pass 'phonePrefix' and 'provider'
export const ROUTING_CHANGE_OTP_PROVIDER = "/routing/otp/otp-provider";
// ROUTING_SUBMIT_CHANGE_OTP_PROVIDER is used for both ADD and CHANGE button
export const ROUTING_SUBMIT_CHANGE_OTP_PROVIDER = "/routing/otp";
export const ROUTING_DELETE_CHANGE_OTP_PROVIDER = "/routing/otp/";
export const ROUTING_NETWORKS_BY_COUNTRYCODE =
  "/routing/country/network?country-code=";
export const ROUTING_SUBMIT_NETWORKS_BY_COUNTRYCODE =
  "/routing/country/network";
export const ROUTING_NETWORKPREFIX_BY_COUNTRYCODE =
  "/routing/country/network-prefix?country-code=";
export const ROUTING_SUBMIT_NETWORKPREFIX_BY_COUNTRYCODE =
  "/routing/network-prefix";
export const ROUTING_SUBMIT_COUNTRYROUTING_BY_COUNTRYCODE =
  "/routing/country/network-routing";
export const ROUTING_NETWORKCOVERAGE_BY_COUNTRYCODE =
  "/routing/country/network-coverage?country-code=";
export const ROUTING_SUBMIT_NETWORKCOVERAGE_BY_COUNTRYCODE =
  "/routing/country/network-coverage";
export const ROUTING_CLIENT_ID = "/routing/clients/id";
export const ROUTING_CURRENCY = "/routing/currency";
export const ROUTING_DESIGNATED_PROVIDER =
  "/routing/designated-provider?provider=";
export const ROUTING_LONGMESSAGE_PROVIDER =
  "/routing/long-msg-provider?provider=";
export const ROUTING_PRICE_BY_MCCMNC = "/routing/networks/price?mccmnc=";
export const ROUTING_PREFERREDPROVIDER_UNMATCHED =
  "/routing/preferred-provider/unmatched";
export const ROUTING_PREFERREDPROVIDER_ALL = "/routing/preferred-provider/all";
export const ROUTING_NETWORKLIST_ALL = "/routing/network-list";
export const ROUTING_NETWORKPREFIX_ALL = "/routing/network-prefix";
export const ROUTING_DESIGNATED_PROVIDER_ALL = "/routing/designated-provider";
export const ROUTING_LONGMESSAGE_PROVIDER_ALL = "/routing/long-msg-provider";
export const ROUTING_ADD_LONGMESSAGE_PROVIDER = "/routing/long-msg-provider";
export const ROUTING_DELETE_LONGMESSAGE_PROVIDER = "/routing/delete-long-msg-provider";
export const ROUTING_ROUTED_NUMBERS = "/routing/routed-numbers";
export const ROUTING_NUMBERROUTING_VALIDATE =
  "/routing/number-validate?number=";
export const ROUTING_NUMBERROUTING_SUBMIT = "/routing/number-submit";
export const ROUTING_PROVIDER_NETWORK = "/routing/provider-network";
export const ROUTING_NETPREFIX_NOT_IN_ROUTING =
  "/routing/network-prefix/not-in-routing?mccmnc=";
export const ROUTING_DELETE_DESIGNATED_PROVIDER = "/client/delete-designated-provider"
export const ROUTING_DELETE_ROUTED_NUMBERS = "/routing/delete/"

