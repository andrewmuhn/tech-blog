const router = require('express').Router();
const { User } = require('../../models');

router.post('/', async (req, res) => {
  try {
    const newUserData = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });
    if (!newUserData) {
      res.status(400).json({
        message: 'You must enter a valid username and password.',
      });
      return;
    }
    const userJustCreated = await User.findOne({
      where: { email: newUserData.email },
    });

    req.session.save(() => {
      req.session.user_id = userJustCreated.id;
      req.session.logged_in = true;
      res.status(200).json(newUserData);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/login', async (req, res) => {
  console.log('inside user login route');
  try {
    const userData = await User.findOne({
      where: { email: req.body.email },
    });

    if (!userData) {
      res.status(400).json({
        message: 'Incorrect email or password, please try again',
      });
      return;
    }

    const validPassword = await userData.checkPassword(
      req.body.password
    );

    if (!validPassword) {
      res.status(400).json({
        message: 'Incorrect email or password, please try again',
      });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.json({ user: userData, message: 'You are now logged in!' });
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/logout', async (req, res) => {
  try {
    if (req.session.logged_in) {
      req.session.destroy(() => {
        res.status(204).end();
      });
    } else {
      res.status(404).end();
    }
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
