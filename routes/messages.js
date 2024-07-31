// routes/messages.js
const express = require('express');
const router = new express.Router();
const Message = require('../models/message');
const { ensureLoggedIn, ensureCorrectUser } = require('../middleware/auth');

// Get message details by ID
router.get('/:id', ensureLoggedIn, async (req, res, next) => {
  try {
    const message = await Message.get(req.params.id);
    const currentUser = req.user.username;

    if (message.from_user.username !== currentUser && message.to_user.username !== currentUser) {
      throw new Error('Unauthorized');
    }

    return res.json({ message });
  } catch (err) {
    return next(err);
  }
});

// Post a new message
router.post('/', ensureLoggedIn, async (req, res, next) => {
  try {
    const from_username = req.user.username;
    const { to_username, body } = req.body;
    const message = await Message.create({ from_username, to_username, body });
    return res.json({ message });
  } catch (err) {
    return next(err);
  }
});

// Mark a message as read
router.post('/:id/read', ensureLoggedIn, async (req, res, next) => {
  try {
    const message = await Message.get(req.params.id);
    const currentUser = req.user.username;

    if (message.to_user.username !== currentUser) {
      throw new Error('Unauthorized');
    }

    const updatedMessage = await Message.markRead(req.params.id);
    return res.json({ message: updatedMessage });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;