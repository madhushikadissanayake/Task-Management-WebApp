const express = require('express');
const passport = require('passport');
const { googleCallback, getProfile, logout } = require('../controllers/authController');
const { auth } = require('../middlewares/auth');

const router = express.Router();

// Google OAuth routes
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback', 
  passport.authenticate('google', { session: false }),
  googleCallback
);

// Protected routes
router.get('/profile', auth, getProfile);
router.post('/logout', auth, logout);

module.exports = router;