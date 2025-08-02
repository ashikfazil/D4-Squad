'use strict'

import { addAsset } from "./addToTable.js"
import { deleteAsset } from "./deleteFromTable.js";
import { updateAsset } from "./updateTable.js";
import { viewAllAssets } from "./viewAll.js";
import { viewStockAssets } from "./viewStock.js";

// addAsset('rando', 'r', 1000, 10, 'Stock', '2023-10-01')
//     .then(id => console.log(`Asset added with ID: ${id}`))

// deleteAsset(8, 1)
//     .then(id => console.log(`Asset processed with ID: ${id}`))

// updateAsset(1, 'Bitcoin', 'BTC', 46000, 150, 'Cryptocurrency')
//     .then(id => console.log(`Asset updated with ID: ${id}`))

// viewAllAssets()
//     .then(assets => console.log('Assets retrieved:', assets))

viewStockAssets()
    .then(assets => console.log('Stock assets retrieved:', assets))