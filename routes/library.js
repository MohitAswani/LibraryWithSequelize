const express = require('express');

const libraryController=require('../controllers/library');

const router=express.Router();

router.get('/',libraryController.getLibrary);

router.get('/library',libraryController.getLibrary);

router.get('/cart');

router.get('/loaned');

module.exports=router;