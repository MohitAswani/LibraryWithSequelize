const express = require('express');

const adminController=require('../controllers/admin');

const router=express.Router();

router.get('/add-book',adminController.getAddBook);

router.post('/add-book',adminController.postAddBook);

router.get('/edit-book',adminController.getEditBook);

router.post('/edit-book',adminController.postEditBook);

router.get('/delete-book',adminController.getDeleteBook);

router.get('/library',adminController.getAdminBooks);

module.exports=router;