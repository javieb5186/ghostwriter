const router = require('express').Router();
const User = require('../../models/User');

router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });
    const validLogIn = await userData.checkPassword(req.body.password);
    console.log(validLogIn);
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
        name: req.body.n,
        email: req.body.email,
        password: req.body.password,
        preferences: req.body.pref,
      });
      res.status(200).json(dbUserData);
      console.log('Preferences are: ');
      console.log(dbUserData.getPreferences());
    } else {
      res.status(404).send('User already exists');
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
