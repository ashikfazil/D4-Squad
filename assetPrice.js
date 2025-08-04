'use strict'
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
dotenv.config();
export async function calculateTotalPrice(name, category) {
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
        rows.forEach(row => {
            totalPrice += row.price * row.volume;
        });
        console.log(`Total price for ${name} in ${category}:`, totalPrice);
        return totalPrice;
    } catch (error) {
        console.error('Error calculating total price:', error);
        throw error;
    } finally {
        await conn.end();
    }
}
