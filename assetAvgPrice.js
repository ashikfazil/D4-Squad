'use strict'
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
dotenv.config();
export async function calculateAvgAssetPrice(name, category) {
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
            WHERE Name = ? AND category = ?
        `;
        const [rows] = await conn.execute(query, [name, category]);
        let totalPrice = 0;
        let totalVolume = 0;
        rows.forEach(row => {
            totalPrice += row.price * row.volume;
            totalVolume += row.volume;
        });
        const avgPrice = totalVolume > 0 ? totalPrice / totalVolume : 0;
        console.log(`Average price for ${name} in ${category}:`, avgPrice);
        return avgPrice;
    } catch (error) {
        console.error('Error calculating total price:', error);
        throw error;
    } finally {
        await conn.end();
    }
}
