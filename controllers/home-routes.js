const router = require("express").Router();
const { Post, User, Comment } = require("../models");
const sequelize = require("../config/connection"); //might not need this here.

// GET ALL POSTS AND RENDER. TESTED!
router.get("/", async (req, res) => {
  try {
    const allPostData = await Post.findAll({
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
    const posts = allPostData.map((post) => post.get({ plain: true }));
    res.render("homepage", {
      posts,
      logged_in: req.session.logged_in,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

// GET LOGIN AND RENDER LOGIN
router.get("/login", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/");
    return;
  }
  res.render("login");
});

// GET SIGNUP AND RENDER SIGNUP
router.get("/signup", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/");
    return;
  }
  res.render("signup");
});

// GET ONE POST BY ID AND RENDER SINGLE POST. TESTED!
router.get("/post/:id", async (req, res) => {
  try {
    const commentData = await Post.findByPk(req.params.id, {
      include: [
        {
          model: Comment,
          attributes: ["id", "user_id", "post_id", "comment_txt", "created_at"],
          include: [
            {
              model: User,
              attributes: ["username"],
            },
          ],
        },
      ],
    });
    if (!commentData) {
      res
        .status(404)
        .json({ message: `No post with ID ${req.params.id} found.` });
    }
    const comments = commentData.get({ plain: true });
    res.render("post-comments", {
      ...comments,
      logged_in: req.session.logged_in,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

router.get();

module.exports = router;
