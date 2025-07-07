const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const checkRole = require('../middleware/role');
const {
  getProducts,
  addProduct,
  updateProduct,
  deleteProduct
} = require('../controllers/productController');

// Public - anyone can view
router.get('/', getProducts);

// Admin-only routes
router.post('/', auth, checkRole('admin'), addProduct);
router.put('/:id', auth, checkRole('admin'), updateProduct);
router.delete('/:id', auth, checkRole('admin'), deleteProduct);

module.exports = router;
