'use strict'
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
dotenv.config();
async function addTransaction(name, category, price, createdAt, quantity) {
    const conn = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
    });
    try {
        const query = `
            INSERT INTO transaction (name, category, transaction_type, price, date, quantity)   
            VALUES (?, ?, 'sell', ?, ?, ?)
        `;
        const [result] = await conn.execute(query, [name, category, price, createdAt, quantity]);
        console.log('Transaction added successfully, ID:', result.insertId);
        return result.insertId;
    } catch (error) {
        console.error('Error adding transaction:', error);
        throw error;
    } finally {
        await conn.end();
    }
}
export async function deleteAsset(assetId, volumeSold) {
    const conn = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
    });
    try {
        const [asset] = await conn.execute('SELECT name, shortForm, price, volume, category, createdAt FROM assets WHERE Asset_id = ?', [assetId]);
        if (asset.length === 0) {
            console.log(`Asset with Asset_id ${assetId} not found.`);
            return null; 
        }

        const assetData = asset[0];
        const currentVolume = assetData.volume;

        if (currentVolume < volumeSold) {
            console.log(`Error: Insufficient volume. Only ${currentVolume} units available.`);
            return null; 
        }

        if (currentVolume === volumeSold) {
            const [deleteResult] = await conn.execute('DELETE FROM assets WHERE Asset_id = ?', [assetId]);
            console.log(`Asset with Asset_id ${assetId} deleted successfully.`);
        } else {
            const newVolume = currentVolume - volumeSold;
            const [updateResult] = await conn.execute('UPDATE assets SET volume = ? WHERE Asset_id = ?', [newVolume, assetId]);
            console.log(`Asset with Asset_id ${assetId} volume reduced by ${volumeSold}. New volume is ${newVolume}.`);
        }

        await addTransaction(assetData.name, assetData.category, assetData.price, assetData.createdAt, volumeSold);

        return assetId; 
    } catch (error) {
        console.error('Error processing asset deletion or update:', error);
        throw error;
    } finally {
        await conn.end();
    }
}
