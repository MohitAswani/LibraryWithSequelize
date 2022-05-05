const Book=require('../models/book');

exports.getLibrary = (req,res,next)=>{

    Book.findAll()
    .then(books=>{
        res.render('library/library.ejs',{
            pageTitle:'Library',
            path:'/library',
            books:books
        });
    })
    .catch(err=>{
        console.log(err);
    })
}