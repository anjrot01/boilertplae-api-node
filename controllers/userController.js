const UsersModel = require("../models/User");

/**
 * GET all users
 * @param {*} req
 * @param {*} res
 */
exports.getUsers = async (req, res) => {
  try {
    const users = await UsersModel.find();
    if (users.length === 0) return res.send("Db has no users!!!");
    res.json(users);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

/**
 * GET Users by ID
 * @param {*} req
 * @param {*} res
 */
exports.getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await UsersModel.findById(id);
    if (!user) return res.status(404).send("User does not exists");
    res.json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

/**
 * PUT Update user by ID
 * @param {*} req
 * @param {*} res
 */
exports.updateUsersById = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedUser = await UsersModel.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedUser) return res.status(404).send("User does not exists");
    res.json(updatedUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

/**
 * DELETE User by ID
 * @param {*} req
 * @param {*} res
 */
exports.deleteUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedUser = await await UsersModel.findByIdAndDelete(id);
    if (!deletedUser) return res.status(404).send("User does not exists");
    res.json({
      deletedUser: {
        email: deletedUser.email
      }
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
