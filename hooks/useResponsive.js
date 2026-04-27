import { useWindowDimensions } from "react-native";

const WIDTH_BASELINE = 375;
const HEIGHT_BASELINE = 812;

export const useResponsive = () => {
  const { width, height } = useWindowDimensions();

  const isSmallPhone = width < 360;
  const isTablet = Math.min(width, height) >= 768;
  const isLandscape = width > height;
  const hS = (size) => (width / WIDTH_BASELINE) * size;
  const vS = (size) => (height / HEIGHT_BASELINE) * size;
  const fS = (size, factor = 0.3) =>
    Math.round(size + (hS(size) - size) * factor);
  const sS = (size, factor = 0.2) =>
    Math.round(size + (hS(size) - size) * factor);
  const rS = (size, factor = 0.2) =>
    Math.round(size + (hS(size) - size) * factor);
  const iS = (size, factor = 0.3) =>
    Math.round(size + (hS(size) - size) * factor);
  const htS = (size, factor = 0.25) =>
    Math.round(size + (hS(size) - size) * factor);

  return {
    width,
    height,
    isSmallPhone,
    isTablet,
    isLandscape,
    hS,
    vS,
    fS,
    sS,
    rS,
    iS,
    htS,
  };
};
