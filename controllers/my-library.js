var Library = require('../models/library');
var Book = require('../models/book')

module.exports = {
    index,
    create,
    new: newBook,
    delete: deleteBook,
    edit
};

function index(req, res, next) {
    req.user == null ? res.redirect('/auth/google') :
    Library.findOne({_id: req.user.id})
    .populate('books')
    .exec((err, bookies) => {
        res.render('library/my-library', {
            user: req.user,
            name: req.query.name,
            books: bookies.books
            });
        })
    
};

function create(req, res, next) {
    for (let key in req.body){
        if (req.body[key] === '') delete req.body[key];
    }
    var book = new Book(req.body);
    req.user.books.push(book);
    book.save(function(err) {
    //to handle errors
        if (err) return res.render('/new');
    });
    req.user.save(function(err){
        if (err) return res.render('/new');
    })
    res.redirect('/my-library');
};

function newBook(req, res, next) {
    res.render('library/new', { title: 'Add Book', user: req.user, Book });
};

function deleteBook(req, res, next) {
    Book.findByIdAndRemove(req.params.id, function(error, deletedBook){
        if(error){
            console.log(error)
        } else {
            console.log(deleteBook, 'This Book was deleted')
            res.redirect('/my-library')
        }
    });
};

function edit(req, res, next) {
    Book.findById(req.params.id, function(err, book){
        res.render('/my-library/:id/edit', {book, req})
    })
}