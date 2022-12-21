const { database } = require("./database");
const log = require("../utils/logger");

// Create table if it doesn't exist already
async function createTable(database) {
  try {
    await database.connect();
    log.info("Dropping index table if exists...");
    await database.query(`DROP TABLE IF EXISTS index;`);
    log.info("Creating transaction table...");
    await database.query(
      `CREATE TABLE IF NOT EXISTS index (op_return text NOT NULL, transactionid text NOT NULL, blockhash text NOT NULL, blockheight integer NOT NULL, unique(transactionid));`
    );
    log.info("Table created successfully");
    process.exit();
  } catch (err) {
    log.error(err);
  }
}

createTable(database);
