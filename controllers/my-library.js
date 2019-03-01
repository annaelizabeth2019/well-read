var Library = require('../models/library');
var Book = require('../models/book')

module.exports = {
    index,
    create,
    new: newBook
};

function loopedyLoop(){
    
}

function index(req, res, next) {

    Library.findOne(req.user, function(err, library) {
    (console.log(library, 'this is library'))
    res.render('library/my-library', {
        user: req.user,
        name: req.query.name,
        library: library,
        books: library.books
        });
    });
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
    console.log(req.user, 'this is req.user')
    res.redirect('/my-library');
};

function newBook(req, res, next) {
    res.render('library/new', { title: 'Add Book', user: req.user, Book });
};