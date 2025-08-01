'use strict'
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
dotenv.config();
export async function addAsset(name, shortForm, price, volume, category,createdAt) {
    const conn = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
    });
    try {
        const query = `
            INSERT INTO assets (Name, shortForm, price, volume, category,createdAt)   
            VALUES (?, ?, ?, ?, ?,?)
        `;
        const [result] = await conn.execute(query, [name, shortForm, price, volume, category,createdAt]);  //This now stops injection attacks from taking place
        console.log('Asset added successfully, ID:', result.insertId);
        return result.insertId; 
    } catch (error) {
        console.error('Error adding asset:', error);
        throw error;
    } finally {
        await conn.end();
    }
}
