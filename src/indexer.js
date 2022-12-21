const log = require("../src/utils/logger");
const requestRpc = require("../src/utils/rpc");
const database = require("../src/database/database");
const {
  indexBlockTransactions,
} = require("../src/utils/indexBlockTransactions");
const { indexer } = require("../config");

const idleTime = indexer.idleTime;
const startBlock = indexer.startBlock;

// Get the latest block height from the Bitcoin blockchain
const getBtcBlockHeight = async () => {
  const response = await requestRpc("getblockchaininfo");
  return response.blocks;
};

// Start indexing the Bitcoin blockchain from the latest indexed block height
const startIndexing = async (startBlock) => {
  const latestIndexedBlockHeight = await database.getIndexedBlockHeight();
  const latestBtcBlockHeight = await getBtcBlockHeight();
  log.info(`Latest indexed block height: ${latestIndexedBlockHeight}`);
  log.info(`Latest BTC block height: ${latestBtcBlockHeight}`);
  const startBlockHeight =
    startBlock > latestIndexedBlockHeight
      ? startBlock
      : latestIndexedBlockHeight;
  if (latestIndexedBlockHeight === latestBtcBlockHeight) {
    log.info("Indexing is up to date.");
    setTimeout(startIndexing, idleTime);
  }
  if (latestIndexedBlockHeight < latestBtcBlockHeight) {
    const nextBlockHeight = startBlockHeight + 1;
    log.info(`Indexing transactions on block: ${nextBlockHeight}`);

    await indexBlockTransactions(nextBlockHeight);
    startIndexing();
  }
};

startIndexing(startBlock);

module.exports = { getBtcBlockHeight, startIndexing };
