const connectToDatabase = require('./connection');

let dbInstance;

async function getDatabase() {
  if (!dbInstance) {
    const client = await connectToDatabase();
    dbInstance = client.db("sample_mflix");
  }
  return dbInstance;
}

module.exports = getDatabase;
