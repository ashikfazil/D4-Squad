import dotenv from 'dotenv';
import fetch from 'node-fetch';

dotenv.config({ path: './config.env' });

export async function getStockData(symbol, boughtPrice) {
  const API_KEY = process.env.POLYGON_API_KEY;
  const url = `https://api.polygon.io/v2/aggs/ticker/${symbol.toUpperCase()}/prev?apiKey=${API_KEY}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.results && data.results.length > 0) {
      const currentPrice = data.results[0].c;
      console.log(`\nCurrent Price of ${symbol.toUpperCase()}: $${currentPrice}`);

      const priceChange = currentPrice - boughtPrice;
      const percentChange = ((priceChange / boughtPrice) * 100).toFixed(2);
      console.log(`Price Change: $${priceChange.toFixed(2)} (${percentChange}%)`);
    } else {
      console.log("No data found for this symbol.");
    }
  } catch (err) {
    console.error("Error fetching data:", err.message);
  }
}
