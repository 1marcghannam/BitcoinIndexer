module.exports = {
  // Postgres connection
  postgresql: {
    user: "exodus",
    host: "localhost",
    database: "test",
    password: "exodus",
    port: 5432,
  },
  // RPC connection to Bitcoin Core
  rpc: {
    protocol: "http",
    host: "127.0.0.1",
    user: "bitcoin",
    password: "bitcoin",
    port: 38332,
  },
  indexer: {
    startBlock: 122100, // block to start indexing from
    idleTime: 10000, // 10 seconds
  },
  server: {
    port: 3000, // express server port
  },
};
