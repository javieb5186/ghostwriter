const router = require('express').Router();
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
    // in {} have the info to include / exclude information
    const userData = await User.findByPk(req.session.id, {
      attributes: { exclude: ['password', 'email'] },
    });
    if (!userData) {
      res.status(404).json({ message: 'No user with this id!' });
      return;
    }
    const user = userData.get({ plain: true });
    res.render('user', user);
    // serialize data

    // combine then serialize or combine after?
    // can pass multiple objects and serialize from each table

    res.render('mainNews', {}); // {pass in everything from database}
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
