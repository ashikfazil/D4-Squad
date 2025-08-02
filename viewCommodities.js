'use strict'
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
dotenv.config();

export async function viewCommodityAssets() {
    const conn = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
    });

    try {
        const [assets] = await conn.execute('SELECT * FROM assets WHERE category = "Commoditity"');
        return assets;
    } catch (error) {
        console.error('Error fetching commodity assets:', error);
        throw error;
    } finally {
        await conn.end();
    }
}
