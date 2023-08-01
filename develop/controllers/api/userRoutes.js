const router = require('express').Router();
const User = require('../../models/User');
const auth = require('../../utils/auth');

// A signup route the will allow the user to signup if the email doesn't already exists
router.get('/signup/:email', async (req, res) => {
  try {
    const userData = await User.findOne({ where: { email: req.params.email } });
    if (userData) {
      res.status(200).send({ emailExists: true });
    } else {
      res.status(200).send({ emailExists: false });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// A login route that will look for the email in the database and verifies the password
router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });
    const validLogIn = await userData.checkPassword(req.body.password);
    if (validLogIn) {
      req.session.save(() => {
        req.session.loggedIn = true;
        req.session.user_id = userData.id;
        res.status(200).json(userData);
      });
    } else {
      res.status(500).send('Internal Error');
    }
  } catch (err) {
    res.status(404).send('User not found');
  }
});

// A signup route that creates the user after checking that the email does not exist
router.post('/signup', async (req, res) => {
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });

    if (!userData) {
      const dbUserData = await User.create({
        name: req.body.n,
        email: req.body.email,
        password: req.body.password,
        profileIcon: req.body.profileIconSrc,
      });
      req.session.save(() => {
        req.session.user_id = dbUserData.id;
        req.session.loggedIn = true;
        res.status(200).json(dbUserData);
      });
    } else {
      res.status(404).send('User already exists');
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// Update prefs to user
router.post('/update-prefs', auth, async (req, res) => {
  try {
    const userData = await User.findOne({ where: { id: req.session.user_id } });

    userData.update({ preferences: req.body.prefsArr });

    res.status(200).json('Updated preferences to user');
  } catch (err) {
    res.status(500).json(err);
  }
});

// A route for the user to logout and end their session
router.post('/logout', (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
