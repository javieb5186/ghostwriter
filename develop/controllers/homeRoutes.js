const router = require('express').Router();
const Content = require('../models/Content');
const User = require('../models/User');
const getPrefs = require('../utils/getPreferences');
const auth = require('../utils/auth');

// The root route of our website
router.get('/', async (req, res) => {
  try {
    res.render('welcome');
  } catch (err) {
    res.status(500).json(err);
  }
});

// The route to our login
router.get('/login', async (req, res) => {
  try {
    if (req.session.loggedIn) {
      res.redirect('/main-news/foryou');
      return;
    }
    res.render('login');
  } catch (err) {
    res.status(500).json(err);
  }
});

// The route to our sign page
router.get('/signup', async (req, res) => {
  try {
    res.render('signup');
  } catch (err) {
    res.status(500).json(err);
  }
});

// The route to our about page
router.get('/aboutyou', async (req, res) => {
  try {
    res.render('aboutyou');
  } catch (err) {
    res.status(500).json(err);
  }
});

// A route to get news from user preferences
router.get('/main-news/foryou', auth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id);

    const userPrefs = userData.getPreferences();
    const { length } = userPrefs;
    const prefs = [];

    for (let i = 0; i < length; i += 1) {
      prefs.push(userPrefs[i]);
    }

    const articleContent = await Content.findAll({ where: { category: prefs } });
    const user = userData.get({ plain: true });
    const content = await articleContent.map((cont) => cont.get({ plain: true }));
    console.log(user);
    console.log(content);

    res.render('mainNews', {
      user,
      content,
    });
  } catch (err) {
    res.status(500).json(err);
    console.error(err);
  }
});

// A route to get all news by category
router.get('/main-news/:category', auth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id);

    const articleContent = await Content.findAll({ where: { category: req.params.category } });
    const user = userData.get({ plain: true });
    const content = await articleContent.map((cont) => cont.get({ plain: true }));
    console.log(user);
    console.log(content);

    res.render('mainNews', {
      user,
      content,
    });
  } catch (err) {
    res.status(500).json(err);
    console.error(err);
  }
});

// A route to get the article by id
router.get('/article/:id', auth, async (req, res) => {
  try {
    const articleData = await Content.findByPk(req.params.id);
    const userData = await User.findByPk(req.session.user_id);

    const content = await articleData.get({ plain: true });
    const user = userData.get({ plain: true });

    res.render('article', { user, content });
  } catch (err) {
    res.status(500).json(err);
    console.error(err);
  }
});

// The route to our preferences page, getting all preferences store in the database
router.get('/preferences', async (req, res) => {
  try {
    const prefs = await getPrefs();
    res.render('preferences', { prefs });
  } catch (err) {
    res.status(500).json(err);
  }
});

// router.get('/article', async (req, res) => {
//   try {
//     const userData = await User.findByPk(req.params.id, {
//       attributes: { include: ['isAdmin'] },
//     });
//     const articleContent = await Content.findByPk(req.params.id, {
//       attributes: { exclude: ['Description'] },
//     });

//     const user = userData.get({ plain: true });
//     const content = articleContent.get({ plain: true });
//     console.log(user);
//     console.log(content);

//     res.render('mainNews', {
//       user,
//       content,
//       logged_in: req.session.logged_in,
//     });
//   } catch (err) {
//     res.status(500).json(err);
//     console.error(err);
//   }
// });

module.exports = router;
