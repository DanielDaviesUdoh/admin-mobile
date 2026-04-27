import {
  ROUTING_ACTIVEPROVIDERS,
  ROUTING_CLIENT_ID,
  ROUTING_COUNTRIES,
  ROUTING_CURRENCY,
  ROUTING_LISTING_ALL,
  ROUTING_NETWORKLIST_ALL,
  ROUTING_NETWORKPREFIX_ALL,
  ROUTING_NETWORKPREFIX_BY_COUNTRYCODE,
  ROUTING_PRICE_BY_MCCMNC,
} from "../services/routingEndpoints";
import { useGetData } from "./useGetData";


export const useRoutingListingAll = () => {
  return useGetData(["routingListingAll"], ROUTING_LISTING_ALL, {
    staleTime: 1000 * 60 * 5,
  });
};

export const useRoutingCountries = () => {
  return useGetData(["routingCountries"], ROUTING_COUNTRIES, {
    staleTime: Infinity,
  });
};

export const useRoutingActiveProviders = () => {
  return useGetData(["routingActiveProviders"], ROUTING_ACTIVEPROVIDERS);
};

export const useRoutingPriceByMCCMNC = (mccmnc) => {
  return useGetData(
    ["routingByMccmnc", { mccmnc: mccmnc }],
    `${ROUTING_PRICE_BY_MCCMNC}${mccmnc}`,
    { staleTime: 1000 * 60 * 5 }
  );
};

export const useNetworkPrefixByCountryCode = (countryCode) => {
  return useGetData(
    ["networkPrefixByCountryCode", { countryCode: countryCode }],
    `${ROUTING_NETWORKPREFIX_BY_COUNTRYCODE}${countryCode}`
  );
};

export const useRoutingClientId = () => {
  return useGetData(["clientId"], ROUTING_CLIENT_ID);
};

export const useRoutingCurrency = () => {
  return useGetData(["currency"], ROUTING_CURRENCY);
};

export const useNetworkListAll = () => {
  return useGetData(["networkListAll"], ROUTING_NETWORKLIST_ALL, {
    staleTime: 1000 * 60 * 5,
  });
};

export const useNetworkPrefixAll = () => {
  return useGetData(["networkPrefixAll"], ROUTING_NETWORKPREFIX_ALL);
};
