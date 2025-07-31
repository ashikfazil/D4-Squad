'use strict'

import { addAsset } from "./addToTable.js"
import { deleteAsset } from "./deleteFromTable.js";

// addAsset('Bitcoin', 'BTC', 45000, 100, 'Cryptocurrency')
//     .then(id => console.log(`Asset added with ID: ${id}`))

deleteAsset(1, 50)
    .then(id => console.log(`Asset processed with ID: ${id}`))