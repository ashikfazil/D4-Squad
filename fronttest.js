'use strict'

import { addAsset } from "./addToTable.js"
import { deleteAsset } from "./deleteFromTable.js";
import { updateAsset } from "./updateTable.js";

// addAsset('DogeCoin', 'D', 10000, 100, 'Cryptocurrency')
//     .then(id => console.log(`Asset added with ID: ${id}`))

// deleteAsset(3, 50)
//     .then(id => console.log(`Asset processed with ID: ${id}`))

updateAsset(1, 'Bitcoin', 'BTC', 46000, 150, 'Cryptocurrency')
    .then(id => console.log(`Asset updated with ID: ${id}`))
