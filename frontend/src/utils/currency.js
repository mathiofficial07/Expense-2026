/**
 * Format amount as Indian Rupees (₹)
 * @param {number} amount - The amount to format
 * @returns {string} Formatted currency string (e.g., "₹1,23,456.78")
 */
export const formatINR = (amount) => {
  if (amount === null || amount === undefined) return '₹0.00';
  return `₹${Number(amount).toLocaleString('en-IN', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  })}`;
};

/**
 * Format amount without currency symbol
 * @param {number} amount - The amount to format
 * @returns {string} Formatted number string (e.g., "1,23,456.78")
 */
export const formatAmount = (amount) => {
  if (amount === null || amount === undefined) return '0.00';
  return Number(amount).toLocaleString('en-IN', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
};

/**
 * Parse a formatted currency string back to a number
 * @param {string} currencyString - The formatted currency string (e.g., "₹1,23,456.78" or "1,23,456.78")
 * @returns {number} The parsed number
 */
export const parseCurrency = (currencyString) => {
  if (!currencyString) return 0;
  // Remove currency symbol and commas, then parse to number
  const numberString = currencyString.replace(/[^0-9.-]+/g, '');
  return parseFloat(numberString) || 0;
};

export default {
  formatINR,
  formatAmount,
  parseCurrency
};
