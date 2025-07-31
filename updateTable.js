'use strict'
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
dotenv.config();
export async function updateAsset(assetId, name, shortForm, price, volume, category) {
    const conn = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
    });
    try {
        const query = `
            UPDATE assets
            SET Name = ?, shortForm = ?, price = ?, volume = ?, category = ?
            WHERE Asset_id = ?
        `;
        const [result] = await conn.execute(query, [name, shortForm, price, volume, category, assetId]);
        if (result.affectedRows === 0) {
            console.log(`No asset found with Asset_id: ${assetId}`);
            return null;
        }
        console.log('Asset updated successfully');
        return assetId; 
    } catch (error) {
        console.error('Error updating asset:', error);
        throw error;
    } finally {
        await conn.end();
    }
}
