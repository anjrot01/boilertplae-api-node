const RoleModel = require("../../models/Role");

/**
 * POST Create Role
 * @param {*} req
 * @param {*} res
 */
exports.createRole = async (req, res) => {
  const role = new RoleModel(req.body);
  await role.save();
  res.status(201).json(role);
};

/**
 * GET All Roles Only superAdmins could get this response
 * @param {*} req
 * @param {*} res
 */
exports.getRoles = async (req, res) => {
  const roles = await RoleModel.find();
  res.json(roles);
};
