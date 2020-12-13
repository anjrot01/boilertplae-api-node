const postModel = require("../models/Post");
const { mongoErrors, logger } = require("../helpers");

/**
 * POST Create posts
 * @param {*} req
 * @param {*} res
 */
exports.createPost = async (req, res) => {
  logger.log("req.body", req.body);
  try {
    const post = await new postModel(req.body);
    const newPost = await post.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(400).json({ error: mongoErrors(error.message) });
  }
};

/**
 * GET All Posts
 * @param {*} req
 * @param {*} res
 */
exports.getPosts = async (req, res) => {
  try {
    const posts = await postModel.find().sort({ createdAt: -1 });
    if (posts.length === 0) return res.send("There is no Posts in db");
    res.json(posts);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

/**
 * GET Posts by ID
 * @param {*} req
 * @param {*} res
 */
exports.getPostById = async (req, res) => {
  const { id } = req.params;
  try {
    const post = await postModel.findById(id);
    logger.log("post", post);
    res.json(post);
  } catch (error) {
    res.status(404).send("Post does not exists");
  }
};

/**
 * PUT Update post by ID
 * @param {*} req
 * @param {*} res
 */
exports.updatePostByID = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedPost = await postModel.findByIdAndUpdate(id, req.body, { new: true });
    res.json(updatedPost);
  } catch (error) {
    res.status(404).send(error.message);
  }
};

/**
 * DELETE User by ID
 * @param {*} req
 * @param {*} res
 */
exports.deletePostById = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedPost = await postModel.findByIdAndDelete(id);
    if (!deletedPost) return res.status(404).send("Post does not exists");
    res.json({
      deletedPost: {
        title: deletedPost.title
      }
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
