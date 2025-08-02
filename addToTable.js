'use strict'
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
dotenv.config();

async function addAssetp1(name, shortForm, price, volume, category, createdAt) {
    const conn = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
    });
    try {
        const query = `
            INSERT INTO assets (Name, shortForm, price, volume, category, createdAt)   
            VALUES (?, ?, ?, ?, ?, ?)
        `;
        const [result] = await conn.execute(query, [name, shortForm, price, volume, category, createdAt]);
        console.log('Asset added successfully, ID:', result.insertId);
        return result.insertId;
    } catch (error) {
        console.error('Error adding asset:', error);
        throw error;
    } finally {
        await conn.end();
    }
}

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
            VALUES (?, ?, 'buy', ?, ?, ?)
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

export async function addAsset(name, shortForm, price, volume, category, createdAt) {
    try {
        const assetId = await addAssetp1(name, shortForm, price, volume, category, createdAt);
        const transactionId = await addTransaction(name, category, price, createdAt, volume);
        return { assetId, transactionId };
    } catch (error) {
        console.error('Error during asset and transaction handling:', error);
        throw error;
    }
}
