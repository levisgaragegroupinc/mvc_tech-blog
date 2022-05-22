const router = require("express").Router();
const { Post, User, Comment } = require("../../models");

// GET ALL POSTS ROUTE
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
    const posts = allPostData.map((post) => {
      post.get({ plain: true });
    });
    res.render("nameoftemplate_here", {
      posts,
    });
  } catch (error) {
    console.log(err);
    res.status(500).json(err);
  }
});

// GET SINGLE POST BY ID
router.get("/:id", async (req, res) => {
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

    res.render("nameoftemplate_here", {
      postData,
    });
  } catch (error) {
    console.log(err);
    res.status(500).json(err);
  }
});
