const router = require("express").Router();
const { Post, User, Comment } = require("../../models/");
const withAuth = require("../../utils/auth");

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
    if (!allPostData) {
      res.status(404).json({ message: `No posts found.` });
    }
    const posts = allPostData.map((post) => {
      post.get({ plain: true });
    });

    res.status(200).json(posts);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

// GET SINGLE POST BY ID ROUTE
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
    res.status(200).json(postData);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

// CREATE NEW POST ROUTE
router.post("/", withAuth, async (req, res) => {
  if (req.session) {
    try {
      const newPost = await Post.create({
        title: req.body.title,
        post_txt: req.body.content,
        user_id: req.session.user_id,
      });
      res.status(200).json(newPost);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  }
});

// UPDATE POST ROUTE
router.put("/:id", withAuth, async (req, res) => {
  try {
    const updatePost = await Post.update(
      {
        title: req.body.title,
        post_txt: req.body.post_txt,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    if (!updatePost) {
      res
        .status(404)
        .json({ message: `No post found with id: ${req.params.id}` });
    }
    res.status(200).json(updatePost);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

// DELETE POST ROUTE
router.delete("/:id", withAuth, async (req, res) => {
  try {
    const postData = await Post.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!postData) {
      res
        .status(404)
        .json({ message: `No post found with id: ${req.params.id}` });
    }
    res.status(200).json(postData);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

module.exports = router;
