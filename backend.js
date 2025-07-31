'use strict'
import mysql from 'mysql2/promise'
import dotenv from 'dotenv';
dotenv.config();
export async function getConnection() {
    try {
        const conn = await mysql.createConnection({
                host: process.env.DB_HOST,
                user: process.env.DB_USER,
                password: process.env.DB_PASSWORD,
                database: process.env.DB_NAME,
            });
        console.log('Database connection established successfully');
        const [rows, fields] = await conn.query('SELECT * FROM assets');
        console.log(rows);  
        return conn; 
    } catch (error) {
        console.error('Error connecting to the database:', error);
        throw error;
    }
    
}
getConnection()


