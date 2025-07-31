'use strict'
import mysql from 'mysql2/promise'
export async function getConnection() {
    try {
        const conn = await mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'n3u3da!',
            database: 'financial_monitor',
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


