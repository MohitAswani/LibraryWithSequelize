const Book = require('../models/book');

exports.getAddBook = (req, res, next) => {
    res.render('admin/addbooks.ejs', {
        pageTitle: 'Add a book',
        path: '/admin/add-book',
        editing: false,
        book: {}
    });
}

exports.postAddBook = (req, res, next) => {
    const { title, price, description, image } = req.body;

    req.user.createBook({
        title: title,
        price: price,
        description: description,
        image: image
    }).then(result => {
        console.log('Book added');
        res.redirect('/admin/library');
    }).catch(err => {
        console.log(err);
    })
}

exports.getEditBook = (req, res, next) => {
    const bookId = req.query.id;
    const editMode = req.query.edit;

    if (!bookId || !editMode) {
        return res.redirect('/');
    }

    req.user.getBooks({ where: { id: bookId } })
        .then(books => {
            const book = books[0];
            if(book)
            {
                res.render('admin/addbooks', {
                    pageTitle: 'Add a book',
                    path: '/admin/add-book',
                    editing: true,
                    book: book
                });
            }

        })
}

exports.postEditBook = (req, res, next) => {
    const bookId = req.body.id;
    const { title, price, description, image } = req.body;

    Book.findByPk(bookId)
        .then(book => {
            book.title = title;
            book.price = price;
            book.description = description;
            book.image = image;

            return book.save();
        })
        .then(result => {
            console.log('UPDATED BOOK');
            res.redirect('/admin/library');
        })
        .catch(err => {
            console.log(err);
        })
}

exports.getDeleteBook = (req, res, next) => {
    const bookId = req.query.id;

    Book.findByPk(bookId)
        .then(book => {
            return book.destroy();
        })
        .then(result => {
            console.log('DELETED BOOK');
            res.redirect('/admin/library');
        })
        .catch(err => {
            console.log(err);
        })
}

exports.getAdminBooks = (req, res, next) => {
    req.user.getBooks()
        .then(books => {
            res.render('admin/adminbooks.ejs', {
                pageTitle: 'Admin books',
                path: '/admin/library',
                books: books
            });
        })
        .catch(err => {
            console.log(err);
        })
}