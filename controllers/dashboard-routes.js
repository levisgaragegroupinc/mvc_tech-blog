const router = require("express").Router();
const { Post, User, Comment } = require("../models");
const withAuth = require("../utils/auth");

// GET ALL POSTS AND DASHBOARD RENDER
// router.get("/", withAuth, async (req, res) => {
//   try {
//     const allUserPosts = await Post.findAll({
//       where: {
//         user_id: req.session.user_id,
//       },
//       attributes: ["id", "title", "created_at", "post_txt"],
//       include: [
//         {
//           model: Comment,
//           attributes: ["id", "user_id", "post_id", "comment_txt", "created_at"],
//         },
//         {
//           model: User,
//           attributes: ["username"],
//         },
//       ],
//     });
//     if (!allUserPosts) {
//       res.status(404).json({ message: `No posts found.` });
//     }
//     const userPosts = allUserPosts.map((post) => post.get({ plain: true }));
//     res.render("dashboard", { userPosts, loggedIn: true });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json(error);
//   }
// });

// Dashboard Test Code
router.get("/", withAuth, async (req, res) => {
  const post_data = await Post.findAll({
    include: User,
    where: { user_id: req.session.user_id },
  });
  let posts = post_data.map((post) => post.get({ plain: true }));
  posts = posts.map((post) => {
    post.is_current_user = true;
    return post;
  });
  res.render("dashboard", { posts: posts, loggedIn: req.session.loggedIn });
});

// GET ONE POST EDIT FORM AND RENDER
// router.get("/edit/:id", withAuth, async (req, res) => {
//   try {
//     const postData = await Post.findOne({
//       where: {
//         id: req.params.id,
//       },
//       attributes: ["id", "title", "created_at", "post_txt"],
//       include: [
//         {
//           model: Comment,
//           attributes: ["id", "user_id", "post_id", "comment_txt", "created_at"],
//         },
//         {
//           model: User,
//           attributes: ["username"],
//         },
//       ],
//     });
//     if (!postData) {
//       res
//         .status(404)
//         .json({ message: `No post with ID ${req.params.id} found.` });
//     }
//     const post = postData.get({ plain: true });

//     // added a console.log
//     console.log("This is the post on the get edit/id route", post);

//     res.render("edit-post", {
//       post,
//       loggedIn: true,
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json(error);
//   }
// });

// Test code for get one post and edit
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

    // added a console.log
    console.log("This is the post on the get edit/id route", post);

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
