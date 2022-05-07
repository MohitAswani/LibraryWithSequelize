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

exports.getCart=(req,res,next)=>{
    
    req.user.getCart()
        .then(cart=>{
            return cart.getBooks();
        })
        .then(books=>{
            res.render('library/cart',{
                pageTitle:'Cart',
                path:'/cart',
                books:books
            });
        })
        .catch(err=>{
            console.log(err);
        })
}

exports.postAddToCart=(req,res,next)=>{
    const bookId=req.body.bookId;

    let fetchedCart;
    let newQuantity=1;
    req.user.getCart()
        .then(cart=>{
            fetchedCart=cart;
            return cart.getBooks({where:{id:bookId}});
        })
        .then(books=>{
            let book;
            if(books.length>0)
            {
                book=books[0];
            }
            if(book)
            {
                const oldQuantity=book.cartItem.quantity;
                newQuantity=oldQuantity+1;

                return Promise.resolve(book);
            }
            return Book.findByPk(bookId);
        })
        .then(book=>{
            return fetchedCart.addBook(book,{
                through:{
                    quantity:newQuantity
                }
            });
        })
        .then(result=>{
            console.log('ADDED BOOK TO THE CART');
            res.redirect('/cart');
        })
        .catch(err=>{
            console.log(err);
        })
}

exports.postDeleteFromCart=(req,res,next)=>{
    const {bookId}=req.body;

    req.user.getCart()
        .then(cart=>{
            return cart.getBooks({where:{id:bookId}});
        })
        .then(books=>{
            const book=books[0];
            return book.cartItem.destroy();
        })
        .then(result=>{
            console.log('ITEM REMOVED FROM CART');
            res.redirect('/cart');
        })
        .catch(err=>{
            console.log(err);
        })
}

exports.getLoan=(req,res,next)=>{
    
    req.user.getLoans({include:['books']})
    .then(loans=>{
        res.render('library/loaned.ejs',{
            path:'/loaned',
            pageTitle:'Loans',
            loans:loans
        })
    })
    .catch(err=>{
        console.log(err);
    });
}

exports.postLoan=(req,res,next)=>{

    let fetchedCart;
    req.user.getCart()
    .then(cart=>{
        fetchedCart=cart;
        return cart.getBooks();
    })
    .then(books=>{
        return req.user.createLoan()
            .then(loan=>{
                return loan.addBooks(books.map(book=>{
                    book.loanItem={quantity:book.cartItem.quantity};
                    return book;
                }))
            })
            .catch(err=>{
                console.log(err);
            })
    })
    .then(result=>{
        console.log('LOAN CREATED');
        return fetchedCart.setBooks(null);
    })
    .then(result=>{
        res.redirect('/cart');
    })
    .catch(err=>{
        console.log(err);
    })
}