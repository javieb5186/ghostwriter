const router = require('express').Router();
const Content = require('../models/Content');
const User = require('../models/User');

router.get('/', async (req, res) => {
  try {
    res.render('welcome');
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', async (req, res) => {
  try {
    res.render('login');
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/signup', async (req, res) => {
  try {
    res.render('signup');
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/aboutyou', async (req, res) => {
  try {
    res.render('aboutyou');
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/main-news', async (req, res) => {
  try {
    const userData = await User.findByPk(req.params.id, {
      attributes: { exclude: ['password', 'email'] },
    });
    const articleContent = await Content.findByPk(req.params.id, {
      attributes: { exclude: ['BlogPost'] },
    });

    const user = userData.get({ plain: true });
    const content = articleContent.get({ plain: true });
    console.log(user);
    console.log(content);

    res.render('mainNews', {
      user,
      content,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
    console.error(err);
  }
});

router.get('/article', async (req, res) => {
  try {
    const userData = await User.findByPk(req.params.id, {
      attributes: { include: ['isAdmin'] },
    });
    const articleContent = await Content.findByPk(req.params.id, {
      attributes: { exclude: ['Description'] },
    });

    const user = userData.get({ plain: true });
    const content = articleContent.get({ plain: true });
    console.log(user);
    console.log(content);

    res.render('mainNews', {
      user,
      content,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
    console.error(err);
  }
});

module.exports = router;
