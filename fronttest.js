'use strict'

import { addAsset } from "./addToTable.js"
import { deleteAsset } from "./deleteFromTable.js";
import { updateAsset } from "./updateTable.js";

// addAsset('Bitcoin', 'BTC', 45000, 100, 'Cryptocurrency')
//     .then(id => console.log(`Asset added with ID: ${id}`))

// deleteAsset(1, 50)
//     .then(id => console.log(`Asset processed with ID: ${id}`))

updateAsset(1, 'Bitcoin', 'BTC', 46000, 50, 'Cryptocurrency')
    .then(id => console.log(`Asset updated with ID: ${id}`))
