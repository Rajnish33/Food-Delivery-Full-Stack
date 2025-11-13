// Converts USD amounts to INR and formats them for display.
// Uses Vite env vars:
// - VITE_USD_TO_INR : exchange rate USD -> INR (default 83)
// - VITE_PRICE_MULTIPLIER : multiplier to apply to displayed USD prices (default 0.7 => show 70% of price)
const RATE = (() => {
  try {
    const r = parseFloat(import.meta.env.VITE_USD_TO_INR);
    return isNaN(r) ? 83 : r;
  } catch (e) {
    return 83;
  }
})();

const MULTIPLIER = (() => {
  try {
  const m = parseFloat(import.meta.env.VITE_PRICE_MULTIPLIER);
  return isNaN(m) ? 0.3 : m;
  } catch (e) {
    return 0.7;
  }
})();

export function usdToInr(usd) {
  const n = Number(usd) || 0;
  return n * RATE;
}

export function applyDisplayMultiplier(usd) {
  const n = Number(usd) || 0;
  return n * MULTIPLIER;
}

export default function formatCurrencyINR(usd) {
  // Apply display multiplier (so UI shows local, lower prices) but do NOT change the underlying stored amount.
  const adjustedUsd = applyDisplayMultiplier(usd);
  const inr = usdToInr(adjustedUsd);
  // Use Indian numbering and currency symbol
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  }).format(inr);
}
