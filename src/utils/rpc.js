const jsonRpc = require("node-json-rpc2");
const { rpc } = require("../../config");
const log = require("./logger");

// Create a JSON-RPC client
const client = new jsonRpc.Client(rpc);

// Make a JSON-RPC request to the Bitcoin node
const requestRpc = async (method, params = []) => {
  log.info(`[${method}]`, params[0]);
  return await new Promise((resolve, reject) => {
    client.call({ method, params }, (err, res) => {
      if (err) {
        log.error(err);
        return reject(err);
      }
      resolve(res.result);
    });
  });
};

module.exports = requestRpc;
