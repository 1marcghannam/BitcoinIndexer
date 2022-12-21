# Bitcoin OP_RETURN Indexer

## I. About

The purpose of this project is to store and index Bitcoin OP_RETURN data for all transactions in the signet blockchain. This data will then be served on an HTTP endpoint as a JSON payload.

## II. Pre-requisites

### 1. Setup Bitcoin Core for Signet Network

- Install [here](https://bitcoin.org/en/download)

### 2. Setup a database with Postgres

- Install postgres [here](https://www.postgresql.org/docs/)

## III. Local Setup

### 1. Clone repo

```
$ git clone git@github.com:ExodusMovementInterviews/Marc-Ghannam.git
```

### 2. Setup config.js file

```javascript
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
```

### 3. Install dependencies.

```
$ npm i
```

### 4. Create table in Postgres

To store and query the indexed transactions, create a table in the PostgreSQL database.

```
$ npm run table
```

### 5. Run tests

Before running the indexer, make sure your connection to the database and Bitcoin Core RPC is successful.

```
$ npm test
```

### 5. Start the indexer

The indexer will save all the transactions with OP_RETURN data from every block. It will keep monitoring new blocks and automatically index them as well.

```
$ npm run indexer
```

### 5. Start express server

To query the transactions by OP_RETURN, start the Express app.

```
$ npm run app
```

Example of using the Express app:

Url:

```
http://localhost:3000/opreturn/aa21a9edb24823f6c01262a590059fb9bb2c7d1013bfedba7ff44f95ed7ac758e689ad12
```

Output:

```json
{
  "op_return": "aa21a9edb24823f6c01262a590059fb9bb2c7d1013bfedba7ff44f95ed7ac758e689ad12",
  "transactionid": "8356d006d081403997ecf0abffc6ee49774dbf9e5c7f795826aefedb259fef95",
  "blockhash": "000000c50ae88c934dbd0432e4434fd9bfad3baf0e29553a72050fb11388d800",
  "blockheight": 122104
}
```
