const express = require("express");
const app = express();
const log = require("./src/utils/logger");
const { getTransactionByOpReturn } = require("./src/database/database");
const { server } = require("./config");

app.get("/opreturn/:opReturnData", (req, res) => {
  const query = req.params.opReturnData;
  log.info(`GET /opreturn/${query}`);

  // Get the transaction by OP_RETURN
  getTransactionByOpReturn(query).then((data) => {
    try {
      res.json(data);
    } catch (err) {
      log.error(`GET /opreturn/${query}`, "Not found");
      return res
        .status(404)
        .send(`Could not find transaction with OP_RETURN: ${query}`);
    }
  });
});

app.listen(server.port, () => {
  console.log(`Server running on ${server.port}`);
});
