const router = require("express").Router();
const { Post, User, Comment } = require("../../models");

// GET ALL USERS ROUTE
router.get("/", async (req, res) => {
  try {
    const allUsersData = await User.findAll({
      attributes: { exclude: ["password"] },
    });
    if (!allUsersData) {
      res.status(404).json({ message: `No users found.` });
    }
    const users = allUsersData.map((user) => {
      user.get({ plain: true });
    });
    res.render("nameoftemplate_here", {
      users,
    });
  } catch (error) {
    console.log(err);
    res.status(500).json(err);
  }
});

// GET SINGLE USER BY ID ROUTE
router.get("/:id", async (req, res) => {
  try {
    const userData = await User.findByPk({
      attributes: { exclude: ["password"] },
      where: {
        id: req.params.id,
      },
      include: [
        {
          model: Post,
          attributes: ["id", "title", "post_txt", "created_at"],
        },
        {
          model: Comment,
          attributes: ["id", "comment_txt", "created_at"],
          include: {
            model: Post,
            attributes: ["title"],
          },
        },
      ],
    });
    if (!userData) {
      res
        .status(404)
        .json({ message: `No user with ID ${req.params.id} found.` });
    }
    res.render("nameoftemplate_here", {
      postData,
    });
  } catch (error) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;

// CREATE NEW USER ROUTE
router.post("/", (req, res) => {
  try {
const newUserRequest = req.body;
newUserRequest.password = await bcrypt.has(req.body.password, 10);
    const newUser = await User.create(newUser);
    res.render('nameoftemplate_here');
  } catch (error) {
    console.log(err);
    res.status(500).json(err);
  }
});

// USER LOGIN ROUTE
router.post('/login', async (req, res) => {
    try {
      const userData = await User.findOne({ where: { username: req.body.username } });
      if (!userData) {
        res.status(404).json({ message: 'Login failed. Please try again!' });
        return;
      }
      const validPassword = await bcrypt.compare(
        req.body.password,
        userData.password
      );
      if (!validPassword) {
        res.status(400).json({ message: 'Login failed. Please try again!' });
        return;
      }
      req.session.save(() => {
          req.session.user_id = userData.id;
          req.session.username = userData.username;
          req.session.loggedIn = true;
      });
        res.render('nameoftemplate_here');
        res.status(200).json({ user: userData, message: 'You are now logged in!' });
    } catch (err) {
      res.status(500).json(err);
    }
  });

// USER LOGOUT ROUTE
router.post('/logout', (req, res) => {
    if(req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
}); 

// USER DELETE ROUTE
router.delete("/:id", async (req, res) => {
    try {
      const userData = await User.destroy({
        where: {
          id: req.params.id,
        },
      });
      if (!userData) {
        res
          .status(404)
          .json({ message: `No user found with id: ${req.params.id}` });
      }
      res.render("nameoftemplate_here");
      res.status(200).json(userData);
    } catch (error) {}
  });

  module.exports = router;