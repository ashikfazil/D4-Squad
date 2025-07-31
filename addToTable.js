'use strict'
import mysql from 'mysql2/promise';
export async function addAsset(name, shortForm, price, volume, category) {
    const conn = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'n3u3da!',
        database: 'financial_monitor',
    });
    try {
        const query = `
            INSERT INTO assets (Name, shortForm, price, volume, category)   //This now stops injection attacks from taking place
            VALUES (?, ?, ?, ?, ?)
        `;
        const [result] = await conn.execute(query, [name, shortForm, price, volume, category]);
        console.log('Asset added successfully, ID:', result.insertId);
        return result.insertId; 
    } catch (error) {
        console.error('Error adding asset:', error);
        throw error;
    } finally {
        await conn.end();
    }
}
