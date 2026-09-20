const USD_TO_INR = 83;

export const formatPrice = (usdAmount) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 2,
  }).format(Number(usdAmount) * USD_TO_INR);

export const inrToUsd = (inrAmount) => Number(inrAmount) / USD_TO_INR;