const formatPhp = new Intl.NumberFormat("en-PH", {
  style: "currency",
  currency: "PHP",
  maximumFractionDigits: 0,
});

export const toCurrency = (value: number) => formatPhp.format(value);

