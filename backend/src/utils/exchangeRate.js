import fetch from 'node-fetch' // If using Node.js, install node-fetch package

export async function getINRtoUSDRate() {
  const apiKey = `${process.env.EXCHANGE_RATE}`; // Replace with your actual API key
  const url = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/INR`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.result === "success") {
      const usdRate = data.conversion_rates.USD;
      return usdRate;
    } else {
      throw new Error('Failed to fetch exchange rate');
    }
  } catch (error) {
    console.error('Error fetching exchange rate:', error);
    return null; // Or a fallback rate
  }
}
