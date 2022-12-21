const bunyan = require("bunyan");
const bformat = require("bunyan-format");
const formatOut = bformat({ outputMode: "short" });

// Create a logger
const log = bunyan.createLogger({
  name: "app",
  stream: formatOut,
  level: "debug",
});

module.exports = log;
