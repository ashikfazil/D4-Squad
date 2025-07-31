'use strict'
import mysql from 'mysql2/promise';
export async function deleteAsset(assetId, volumeSold) {
    const conn = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'n3u3da!',
        database: 'financial_monitor',
    });
    try {
        const [asset] = await conn.execute('SELECT volume FROM assets WHERE Asset_id = ?', [assetId]);
        if (asset.length === 0) {
            console.log(`Asset with Asset_id ${assetId} not found.`);
            return null; 
        }
        const currentVolume = asset[0].volume;
        
        if (currentVolume < volumeSold) {
            console.log(`Error: Insufficient volume. Only ${currentVolume} units available.`);
            return null; 
        }
        if (currentVolume === volumeSold) {
            const [result] = await conn.execute('DELETE FROM assets WHERE Asset_id = ?', [assetId]);
            console.log(`Asset with Asset_id ${assetId} deleted successfully.`);
            return assetId;  
        } else {
            const newVolume = currentVolume - volumeSold;
            const [result] = await conn.execute('UPDATE assets SET volume = ? WHERE Asset_id = ?', [newVolume, assetId]);
            console.log(`Asset with Asset_id ${assetId} volume reduced by ${volumeSold}. New volume is ${newVolume}.`);
            return assetId; 
        }

    } catch (error) {
        console.error('Error processing asset deletion or update:', error);
        throw error;
    } finally {
        await conn.end();
    }
}
