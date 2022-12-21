const Pool = require("pg").Pool;
const { postgresql } = require("../../config");
const log = require("../utils/logger");

// Create a new connection pool
const database = new Pool(postgresql);

// Insert a transaction into the database
const insertTransaction = async (
  op_return,
  transactionId,
  blockHash,
  blockHeight
) => {
  const query = `INSERT INTO index (op_return, transactionid, blockhash, blockheight) VALUES ($1, $2, $3, $4) ON CONFLICT (transactionid) DO NOTHING;`;
  try {
  } catch (err) {
    log.error(`Failed to insert transaction: ${transactionId}`, err);
    throw err;
  }
  await database.query(query, [
    op_return,
    transactionId,
    blockHash,
    blockHeight,
  ]);
  log.info(
    `Transaction: ${transactionId} with OP_RETURN: ${op_return} at block height: ${blockHeight} is indexed.`
  );
};

// Get the transaction by OP_RETURN
const getTransactionByOpReturn = async (op_return) => {
  const query = "SELECT * FROM index WHERE op_return = $1";
  const result = await database.query(query, [op_return]);
  return result.rows[0];
};

// Get the latest indexed block height
const getIndexedBlockHeight = async () => {
  const query =
    "SELECT blockheight FROM index ORDER BY blockheight DESC LIMIT 1";
  const result = await database.query(query);
  const height = result.rows[0]?.blockheight;
  return height || 0;
};

module.exports = {
  database,
  insertTransaction,
  getIndexedBlockHeight,
  getTransactionByOpReturn,
};
