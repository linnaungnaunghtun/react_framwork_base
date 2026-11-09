export const formatNumber = (number) => {
  return number ? Number(number).toLocaleString("en-US") : 0;
};
