const express = require('express');

const libraryController=require('../controllers/library');

const router=express.Router();

router.get('/',libraryController.getLibrary);

router.get('/library',libraryController.getLibrary);

router.post('/add-to-cart',libraryController.postAddToCart);

router.get('/cart',libraryController.getCart);

router.post('/cart-delete-item',libraryController.postDeleteFromCart);

router.get('/loaned');

module.exports=router;