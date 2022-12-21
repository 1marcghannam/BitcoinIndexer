const requestRpc = require("./rpc");
const log = require("./logger");
const bitcoin = require("bitcoinjs-lib");
const { insertTransaction } = require("../database/database");

// OP_RETURN prefix
const OP_RETURN_PREFIX = 106;

// OP_RETURN data is stored in the scriptPubKey of the transaction output
const getOpReturnData = (scriptPubKey) => {
  const scriptBuffer = Buffer.from(scriptPubKey, "hex");
  const chunks = bitcoin.script.decompile(scriptBuffer);
  if (!chunks || chunks[0] !== OP_RETURN_PREFIX) {
    return null;
  }
  return Buffer.from(chunks[1]).toString("hex");
};

// Filter out all OP_RETURN data from the transaction outputs
const filterOpReturnData = (tx) => {
  return tx.vout
    .map((vout) => getOpReturnData(vout.scriptPubKey.hex))
    .filter((item) => item !== null);
};

// Index all transactions with OP_RETURN data
const getTransactionsWithOpReturn = (transactions, blockHash, blockHeight) => {
  return transactions.map((tx) => {
    const opData = filterOpReturnData(tx);
    if (opData.length > 0) {
      insertTransaction(opData[0], tx.txid, blockHash, blockHeight);
    }
  });
};

// Index all transactions with OP_RETURN data in a block
const indexBlockTransactions = async (blockHeight) => {
  try {
    const hash = await requestRpc("getblockhash", [blockHeight]);
    const block = await requestRpc("getblock", [hash, 2]);
    await getTransactionsWithOpReturn(block.tx, block.hash, blockHeight);
  } catch (err) {
    log.error(`Failed to index all OP_RETURN metadata for ${blockHeight}`, err);
    throw err;
  }
};

module.exports = indexBlockTransactions;
