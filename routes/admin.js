const express = require('express');

const adminController=require('../controllers/admin');

const router=express.Router();

router.get('/addbook',adminController.getAddBook);

router.post('/addbook',adminController.postAddBook);

router.post('/editbook',adminController.postEditBook);

router.get('/adminbooks',adminController.getAdminBooks);

module.exports=router;