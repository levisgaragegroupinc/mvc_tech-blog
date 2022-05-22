const router = require("express").Router();
const { Comment } = require("../../models");

// GET ALL COMMENTS ROUTE
router.get("/", async (req, res) => {
  try {
    const allCommentData = await Comment.findAll({
      include: [
        {
          model: User,
          attributes: [username],
        },
      ],
    });
    if (!allCommentData) {
      res.status(404).json({ message: `No comments found.` });
    }
    const comments = allCommentData.map((comment) => {
      comment.get({ plain: true });
    });
    res.render("nameoftemplate_here", {
      comments,
      loggedIn: req.session.loggedIn,
    });
  } catch (error) {
    console.log(err);
    res.status(500).json(err);
  }
});

// POST NEW COMMENT ROUTE
router.post("/", async (req, res) => {
  if (req.session) {
    try {
      const newComment = await Comment.create({
        comment_txt: req.body.comment_txt,
        post_id: req.body.post_id,
        user_id: req.body.session.user_id,
      });
      res.render("nameoftemplate_here", {
        newComment,
        loggedIn: req.session.loggedIn,
      });
    } catch (error) {
      console.log(err);
      res.status(500).json(err);
    }
  }
});

// DELETE COMMENT
router.delete("/:id", async (req, res) => {
  try {
    const commentData = await Comment.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!commentData) {
      res
        .status(404)
        .json({ message: `No comment found with id: ${req.params.id}` });
    }
    res.render("nameoftemplate_here");
    res.status(200).json(commentData);
  } catch (error) {}
});
