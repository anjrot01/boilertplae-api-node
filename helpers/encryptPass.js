const bcrypt = require("bcryptjs");

/**
 * Encrypt password before save it
 * @param {*} password
 */
exports.encryptPassword = async password => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

/**
 * Decrypt the password on Login
 * @param {*} password
 * @param {*} comparePassword
 */
exports.decryptPassword = async (password, comparePassword) => {
  return await bcrypt.compare(password, comparePassword);
};
