const express = require('express');
const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('./config');
const User = require('./models/user');
const ExpressError = require('./expressError');
const router = new express.Router();

router.post('/login', async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const isAuthenticated = await User.authenticate(username, password);
    if (!isAuthenticated) {
      throw new ExpressError('Invalid username or password', 400);
    }
    await User.updateLoginTimestamp(username);
    const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: '1h' });
    return res.json({ token });
  } catch (err) {
    return next(err);
  }
});

router.post('/register', async (req, res, next) => {
  try {
    const { username, password, first_name, last_name, phone } = req.body;
    const newUser = await User.register({ username, password, first_name, last_name, phone });
    await User.updateLoginTimestamp(username);
    const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: '1h' });
    return res.json({ token });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;