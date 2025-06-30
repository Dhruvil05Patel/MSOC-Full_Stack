const express = require('express');
const router =  express.Router();
const {getProducts, UpdateProducts, CreateProducts} = require('../controllers/productcontroller')

router.get('/products', getProducts);
router.post('/products', CreateProducts);
router.put('/products/:id', UpdateProducts);

module.exports = router