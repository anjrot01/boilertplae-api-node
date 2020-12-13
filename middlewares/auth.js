const jwt = require("jsonwebtoken");
const UserModel = require("../models/User");

/**
 * Verify a valid token
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
exports.verifyToken = async (req, res, next) => {
  const token = req.headers["x-acces-token"];
  if (!token) return res.status(403).json({ error: "No token provided" });
  try {
    const verify = jwt.verify(JSON.parse(token), process.env.SECRECT);

    const user = await UserModel.findById(verify.id, { password: 0 }).populate("role");
    req.body.author = user.id;
    req.body.role = user.role.id;
    req.body.roleName = user.role.name;

    next();
  } catch (error) {
    res.status(400).json(error.message);
  }
};
