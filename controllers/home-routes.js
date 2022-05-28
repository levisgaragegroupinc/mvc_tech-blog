const router = require("express").Router();
const { Post, User, Comment } = require("../models");
const sequelize = require("../config/connection"); //might not need this here.

// GET ALL POSTS AND RENDER
router.get("/", async (req, res) => {
  try {
    const allPostData = await Post.findAll({
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
    if (!allPostData) {
      res.status(404).json({ message: `No posts found.` });
    }
    const posts = allPostData.map((post) => {
      post.get({ plain: true });
    });
    res.render("homepage", {
      posts,
      loggedIn: req.session.loggedIn,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

// GET LOGIN AND RENDER LOGIN
router.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }
  res.render("login");
});

// GET SIGNUP AND RENDER SIGNUP
router.get("/signup", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }
  res.render("signup");
});

// GET ONE POST BY ID AND RENDER SINGLE POST
router.get("/post/:id", async (req, res) => {
  try {
    const postData = await Post.findByPk({
      where: {
        id: req.params.id,
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
    if (!postData) {
      res
        .status(404)
        .json({ message: `No post with ID ${req.params.id} found.` });
    }
    const post = postData.get({ plain: true });
    res.render("post-comments", {
      post,
      loggedIn: req.session.loggedIn,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

module.exports = router;
