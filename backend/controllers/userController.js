const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.registerUser = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, email, password: hashedPassword });
    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

exports.getFavorites = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).populate('favorites');
    res.status(200).json(user.favorites);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
exports.addToFavorites = async (req, res) => {
  const { medicineId } = req.body;
  try {
    const user = await User.findById(req.user.userId);
    user.favorites.push(medicineId);
    await user.save();
    res.status(200).json(user.favorites);
  } catch (error) {
    res.status(500).json({ message: 'error', error });
  }
};

exports.removeFromFavorites = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(req.user.userId);
    user.favorites = user.favorites.filter((favId) => favId.toString() !== id);
    await user.save();
    res.status(200).json(user.favorites);
  } catch (error) {
    res.status(500).json({ message: 'error', error });
  }
};
