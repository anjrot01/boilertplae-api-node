const UsersModel = require("../../models/User");
const { encryptPassword, decryptPassword, mongoErrors, logger } = require("../../helpers");
const jwt = require("jsonwebtoken");

/**
 * POST Users Creation
 * @param {*} req
 * @param {*} res
 */
exports.register = async (req, res) => {
  req.body.password = await encryptPassword(req.body.password);
  try {
    const user = new UsersModel(req.body);

    logger.log("user", user);
    const userCreated = await user.save();

    const token = jwt.sign({ id: userCreated.id }, process.env.SECRECT, {
      expiresIn: "1 day"
    });

    res.status(201).json({ token });
  } catch (error) {
    res.status(400).json({ error: mongoErrors(error.message) });
  }
};

/**
 * POST Login
 * @param {*} req
 * @param {*} res
 */
exports.login = async (req, res) => {
  const { email, password: pass } = req.body;
  try {
    const user = await UsersModel.find({ email });
    if (user.length === 0) return res.status(404).send("User not found");

    const [{ password, userName, id }] = user;

    const checkPass = await decryptPassword(pass, password);
    if (!checkPass) return res.status(400).send("Email or password invalid!!");

    const token = jwt.sign({ id }, process.env.SECRECT, {
      expiresIn: "1 h"
    });

    res.json({ userName, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
