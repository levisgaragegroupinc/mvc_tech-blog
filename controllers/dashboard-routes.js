// these routes will render a specific handle bars page
const router = require("express").Router();
const { Post, User, Comment } = require("../models");
const sequelize = require("../config/connection");
const withAuth = require("../../utils/auth");

// GET ALL POSTS AND RENDER
router.get("/", withAuth, async (req, res) => {
  try {
    const allUserPosts = await Post.findAll({
      where: {
        user_id: req.session.user_id,
      },
      attributes: ["id", "title", "created_at", "post_txt"],
      include: [
        {
          model: Comment,
          attributes: ["id", "user_id", "post_id", "comment_txt", "created_at"],
        },
        {
          model: User,
          attributes: ["username"],
        },
      ],
    });
    if (!allUserPosts) {
      res.status(404).json({ message: `No posts found.` });
    }
    const userPosts = allUserPosts.map((post) => {
      post.get({ plain: true });
    });
    res.render("dashboard", { userPosts, loggedIn: true });
  } catch (error) {
    console.log(err);
    res.status(500).json(err);
  }
});

// GET ONE POST AND RENDER

// GET CREATE NEW POST AND RENDER

module.exports = router;
