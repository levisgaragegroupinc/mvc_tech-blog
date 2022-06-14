const router = require("express").Router();
const { Post, User, Comment } = require("../models");
const withAuth = require("../utils/auth");

// GET ALL POSTS AND DASHBOARD RENDER
router.get("/", withAuth, async (req, res) => {
  try {
    const allUserPosts = await Post.findAll({
      include: User,
      where: {
        user_id: req.session.user_id,
      },
    });
    if (!allUserPosts) {
      res.status(404).json({ message: `No posts found.` });
    }

    const userPosts = allUserPosts.map((post) => post.get({ plain: true }));
    res.render("dashboard", { posts: userPosts, loggedIn: true });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

// GET ONE POST TO EDIT
router.get("/edit/:id", withAuth, async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      attributes: ["id", "title", "created_at", "post_txt"],
      include: [
        {
          model: User,
          attributes: ["username"],
        },
      ],
    });

    if (!postData) {
      res
        .status(404)
        .json({ message: `No post with ID ${req.params.id} found.` });
    }
    const post = postData.get({ plain: true });
    res.render("edit-post", {
      post: post,
      loggedIn: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

// GET CREATE NEW POST FORM AND RENDER
router.get("/new", withAuth, async (req, res) => {
  res.render("new-post");
});

module.exports = router;
