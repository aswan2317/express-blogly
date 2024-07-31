// middleware/auth.js
const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('../config');

function ensureLoggedIn(req, res, next) {
  try {
    const tokenStr = req.body._token || req.query._token;
    const token = jwt.verify(tokenStr, SECRET_KEY);
    req.user = token;
    return next();
  } catch (err) {
    return res.status(401).json({ message: "Unauthorized" });
  }
}

function ensureCorrectUser(req, res, next) {
  try {
    const tokenStr = req.body._token || req.query._token;
    const token = jwt.verify(tokenStr, SECRET_KEY);
    if (token.username === req.params.username) {
      req.user = token;
      return next();
    } else {
      return res.status(401).json({ message: "Unauthorized" });
    }
  } catch (err) {
    return res.status(401).json({ message: "Unauthorized" });
  }
}

module.exports = {
  ensureLoggedIn,
  ensureCorrectUser
};