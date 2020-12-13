const { timer } = require("./timer");

const colors = {
  red: "\x1b[31m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
  magenta: "\x1b[35m",
  cyan: "\x1b[36m",
  reset: "\x1b[0m"
};

const date = new Date();
const formatDate = date.toLocaleDateString();

const normal = (label, param) => console.log(colors.green, `<< @logger/${label} >>: `, colors.cyan, param);

const rest = (method, url, status) => {
  const start = process.hrtime();
  const ms = timer(start);
  console.log(colors.blue, `[${formatDate}]`, colors.cyan, method, url, status, colors.blue, `${ms.toLocaleString()} ms`, colors.reset);
};

const logger = {
  /**
   * Fancy logs
   * @param {String} label
   * @param {*} param
   */
  log: (label, param) => normal(label, param),

  /**
   * Logger for Endpoints
   * @param {String} method
   * @param {String} url
   * @param {String} status
   */
  endpoint: (method, url, status) => rest(method, url, status)
};

module.exports = { logger };
