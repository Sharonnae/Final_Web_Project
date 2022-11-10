const express = require('express');
const { 
    adminView,
    productView,
    uploadFiles,
    addProduct
} = require('../controllers/adminController');
const router = express.Router();

router.get('/', adminView);
router.get('/products', productView);

router.post('/addProduct', addProduct);
router.post('/upload_files', uploadFiles);

module.exports = router;