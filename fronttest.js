'use strict'

import { addAsset } from "./addToTable.js"
import { deleteAsset } from "./deleteFromTable.js";
import { updateAsset } from "./updateTable.js";

addAsset('Apple', 'Appl', 1000, 10, 'Stock', '2023-10-01')
    .then(id => console.log(`Asset added with ID: ${id}`))

// deleteAsset(3, 100)
//     .then(id => console.log(`Asset processed with ID: ${id}`))

// updateAsset(1, 'Bitcoin', 'BTC', 46000, 150, 'Cryptocurrency')
//     .then(id => console.log(`Asset updated with ID: ${id}`))
