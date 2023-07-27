const router = require('express').Router();

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
    res.render('mainNews');
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
