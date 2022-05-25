const router = require("express").Router();
const { Post, User, Comment } = require("../models");
const sequelize = require("../config/connection");

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
    res.render("homepagetemplate_name", {
      posts,
      loggedIn: req.session.loggedIn,
    });
  } catch (error) {
    console.log(err);
    res.status(500).json(err);
  }
});

// GET LOGIN AND RENDER LOGIN
router.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }
  res.render("logintemplate_name");
});

// GET SIGNUP AND RENDER SIGNUP
router.get("/signup", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }
  res.render("signuptemplate_name");
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
    res.render("singleposttemplate_name", {
      post,
      loggedIn: req.session.loggedIn,
    });
  } catch (error) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
