const express = require("express");
const router = express.Router();
const { reviewRoles, verifyToken, adminRole, isOwner } = require("../middlewares");

const userController = require("../controllers/userController");
const roleController = require("../controllers/Auth/roleController");
const authController = require("../controllers/Auth/authController");
const postController = require("../controllers/postController");

module.exports = () => {
  /*****Users Routes*******/
  router.get("/users", verifyToken, adminRole, userController.getUsers);
  router.get("/users/:id", verifyToken, adminRole, userController.getUserById);
  router.put("/users/:id", verifyToken, adminRole, userController.updateUsersById);
  router.delete("/users/:id", verifyToken, adminRole, userController.deleteUserById);
  /*****Users Routes*******/

  /*****Auth Routes*******/
  router.post("/auth/register", reviewRoles, authController.register);
  router.post("/auth/login", authController.login);
  router.get("/auth/roles", verifyToken, adminRole, roleController.getRoles);
  router.post("/auth/roles", verifyToken, adminRole, roleController.createRole);
  /*****Auth Routes*******/

  /*****Post Routes*******/
  router.get("/posts", postController.getPosts);
  router.get("/posts/:id", postController.getPostById);
  router.post("/posts", verifyToken, adminRole, postController.createPost);
  router.put("/posts/:id", verifyToken, adminRole, isOwner, postController.updatePostByID);
  router.delete("/posts/:id", verifyToken, adminRole, isOwner, postController.deletePostById);
  /*****Post Routes*******/

  return router;
};
