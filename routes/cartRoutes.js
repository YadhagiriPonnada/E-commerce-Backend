const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { getCart, addToCart, removeFromCart } = require('../controllers/cartController');

router.get('/', auth, getCart);
router.post('/', auth, addToCart);
router.delete('/', auth, removeFromCart);

module.exports = router;
