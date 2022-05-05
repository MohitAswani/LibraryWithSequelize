
exports.getAddBook=(req,res,next)=>{
    res.render('admin/addbooks.ejs',{
        pageTitle:'Add a book',
        path:'/admin/addbook',
        editing:false,
        book:{}
    });
}

exports.postAddBook=(req,res,next)=>{

}

exports.postEditBook=(req,res,next)=>{
    
}

exports.getAdminBooks=(req,res,next)=>{
    res.render('admin/adminbooks.ejs',{
        pageTitle:'Admin books',
        path:'/admin/adminbooks'
    });
}