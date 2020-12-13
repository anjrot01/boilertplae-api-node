const RolesModel = require("../models/Role");
const PostModel = require("../models/Post");
const { logger } = require("../helpers");
/**
 * Assign User roles
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
exports.reviewRoles = async (req, res, next) => {
  const role = req.body.role || "user";

  const findRole = await RolesModel.find({ name: role });
  if (findRole.length === 0) return res.status(404).send("Role does not exists!!");

  const [{ id }] = findRole;

  req.body.role = id;

  next();
};

/**
 * Verify is admin
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
exports.adminRole = async (req, res, next) => {
  const { role } = req.body;
  const roles = ["superadmin", "admin", "user"];
  try {
    const findRole = await RolesModel.findById(role);
    const { name } = findRole;
    if (roles.includes(name)) {
      next();
    } else {
      return res.status(401).json({ message: "Unauthorized" });
    }
  } catch (error) {
    res.status(401).json({ message: "Unauthorized" });
  }
};

/**
 * Verify is Owner Note: if SuperAdmin role could continue
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
exports.isOwner = async (req, res, next) => {
  const { id } = req.params;
  logger.log("req.body desde isOwner", id);
  if (!id) return res.status(403).json({ error: "No post provided" });
  try {
    const post = await PostModel.findById(id);
    logger.log("Post", post);
    if (post.author === req.body.author || req.body.roleName === "superadmin") {
      next();
    } else {
      return res.status(401).json({ message: "This user is not post's owner" });
    }
  } catch (error) {
    res.status(400).json(error.message);
  }
};
