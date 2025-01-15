const express = require('express');
const { getProducts, addProduct } = require('../controllers/productController');
const router = express.Router();

router.get('/products', getProducts);
router.post('/products', addProduct);

module.exports = router;
