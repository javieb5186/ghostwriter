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

router.get('/main-news/:id', async (req, res) => {
  try {
    // in {} have the info to include / exclude information
    const userData = await User.findByPk(req.params.id, {
      attributes: { exclude: ['password', 'email'] },
    });

    const user = userData.get({ plain: true });
    console.log(user)
    

    // res.render('main-news', user);
    // Serialize data so the template can read it
    // const projects = projectData.map((project) => project.get({ plain: true }));

    // // Pass serialized data and session flag into template
    // res.render('homepage', { 
    //   projects, 
    //   logged_in: req.session.logged_in 
    // });

    // combine then serialize or combine after?
    // can pass multiple objects and serialize from each table

    res.render('mainNews', {user}); // {pass in everything from database}
  } catch (err) {
    res.status(500).json(err);
    console.error(err)
  }
});

module.exports = router;
