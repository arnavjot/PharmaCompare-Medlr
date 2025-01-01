const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { authenticateToken } = require('../middleware/authMiddleware');

router.post('/signup', userController.registerUser);
router.post('/login', userController.loginUser);
router.post('/favorites', authenticateToken, userController.addToFavorites);
router.delete('/favorites/:id', authenticateToken, userController.removeFromFavorites);
router.get('/favorites', authenticateToken, userController.getFavorites);

module.exports = router;
