const { MongoClient } = require('mongodb');

const url = "mongodb://localhost:27017";
const dbName = 'ShopFitness';

async function connectDb() {
    const client = new MongoClient(url);
    await client.connect();
    console.log('Kết nối thành công đến server gòi ');
    return client.db(dbName);
}
module.exports = connectDb;