const jwt = require('jsonwebtoken');
const User = require('../models/User');

const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

const googleCallback = async (req, res) => {
  try {
    const { googleId, email, name, avatar } = req.user;
    
    let user = await User.findOne({ $or: [{ googleId }, { email }] });
    
    if (!user) {
      user = await User.create({
        googleId,
        email,
        name,
        avatar,
        role: 'admin'
      });
    } else if (!user.googleId) {
      user.googleId = googleId;
      user.avatar = avatar;
      await user.save();
    }

    const token = generateToken(user._id);
    
    // Redirect to frontend with token
    res.redirect(`${process.env.CLIENT_URL}/auth/callback?token=${token}`);
  } catch (error) {
    console.error('Google callback error:', error);
    res.redirect(`${process.env.CLIENT_URL}/login?error=auth_failed`);
  }
};

const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-__v');
    res.json(user);
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const logout = (req, res) => {
  try {
    res.json({ message: 'Logged out successfully' });
  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  googleCallback,
  getProfile,
  logout
};