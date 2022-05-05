
exports.getLibrary = (req,res,next)=>{
    res.render('library/library.ejs',{
        pageTitle:'Library',
        path:'/library'
    });
}