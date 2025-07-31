'use strict'
import mysql from 'mysql2/promise';
export async function updateAsset(assetId, name, shortForm, price, volume, category) {
    const conn = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'n3u3da!',
        database: 'financial_monitor',
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
