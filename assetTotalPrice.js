'use strict'
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
dotenv.config();
export async function calculateAssetPrice(category) {
    const conn = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
    });
    try {
        const query = `
            SELECT price, volume
            FROM assets 
            WHERE category = ?
        `;
        const [rows] = await conn.execute(query, [category]);
        let totalValue = 0;
        
        rows.forEach(row => {
            totalValue += row.price * row.volume;
        });
        console.log(`Combined average price for ${category}:`, totalValue);
        return totalValue;

    } catch (error) {
        console.error('Error calculating combined average price:', error);
        throw error;
    } finally {
        await conn.end();
    }
}
