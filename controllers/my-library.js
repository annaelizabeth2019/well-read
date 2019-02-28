var Library = require('../models/library');
var Book = require('../models/book')

module.exports = {
    index,
    create,
    new: newBook
};

function index(req, res, next) {
    Library.find(req.user, function(err, library) {
    (console.log(library))
    res.render('library/my-library', {
        user: req.user,
        name: req.query.name,
        library: library,
        books: library[0].books,
        })
    });
};

function create(req, res, next) {
    for (let key in req.body){
        if (req.body[key] === '') delete req.body[key];
    }
    
    var book = new Book(req.body);
    book.save(function(err) {
    //to handle errors
        if (err) return res.render('/new');
        // console.log(book);
    });
    req.user.library[0].push(book);
    console.log(req.user)
    res.render('library/my-library', {user: req.user, library: req.user.library[0]});
};

function newBook(req, res, next) {
    res.render('library/new', { title: 'Add Book', user: req.user, Book });
};