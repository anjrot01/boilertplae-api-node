const { logguer } = require("../helpers");
const { logger } = require("../helpers");

/**
 *
 * Logguer api endpoints
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
module.exports = (req, res, next) => {
  const { url, method } = req;
  logger.endpoint(method, url, res.statusCode);
  next();
};
