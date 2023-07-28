const router = require('express').Router();
const User = require('../../models/User');

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

router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });
    const validLogIn = await userData.checkPassword(req.body.password);
    if (validLogIn) {
      res.status(200).json(userData);
    } else {
      res.status(500).send('Internal Error');
    }
  } catch (err) {
    res.status(404).send('User not found');
  }
});

router.post('/signup', async (req, res) => {
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });

    if (!userData) {
      const dbUserData = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        profileIcon: req.body.profileIconSrc,
      });
      res.status(200).json(dbUserData);
    } else {
      res.status(404).send('User already exists');
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
