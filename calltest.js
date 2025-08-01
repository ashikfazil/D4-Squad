import { getStockData } from './stockService.js';

const boughtPrice = 150;
const symbol = 'AAPL';

getStockData(symbol, boughtPrice);
