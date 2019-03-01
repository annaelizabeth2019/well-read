var Library = require('../models/library');
var Book = require('../models/book')

module.exports = {
    index,
    create,
    new: newBook
};

// function index(req, res, next) {
//     Library.findOne(req.user, function(err, library) {
//         return library.books
//     });
// }

// var p = new Promise(function(resolve, reject) {
//    index();
// })

// p.then(function(books){
//     let booksArr = []
//     books.forEach(function(b){
//         findById(b, function(book){
//             booksArr.push(book);
//         });
//         return booksArr;
//     })
// .then(function(booksArr){
//     res.render('library/my-library', {
//         user: req.user,
//         name: req.query.name,
//         books: booksArr
//         });
// })



function index(req, res, next) {


    // function getUserWithPosts(username){
    //     return User.findOne({ username: username })
    //       .populate('posts').exec((err, posts) => {
    //         console.log("Populated User " + posts);
    //       })
    //   }

    // Book.findOne({_id: '5c7885a115d00f2ce009d859'}).then(book => { console.log(book) });
    Library.findOne({_id: req.user.id})
    .populate('books')
    .exec((err, bookies) => {
        console.log(bookies)
        res.render('library/my-library', {
            user: req.user,
            name: req.query.name,
            // library: {books: []},
            books: bookies.books
            });
    })
        // .then(library => {
        //     library.books.forEach(book => {
        //         Book.find({_id: book._id.toString()});
        //         booksArr.push(book);
        //     })
        //     return booksArr;
        // })
        // .then((booksArr) => {
            // console.log(booksArr);
            // res.render('library/my-library', {
            //     user: req.user,
            //     name: req.query.name,
            //     // library: {books: []},
            //     books: booksArr
            //     });
            // });
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
    // console.log(req.user, 'this is req.user')
    res.redirect('/my-library');
};

function newBook(req, res, next) {
    res.render('library/new', { title: 'Add Book', user: req.user, Book });
};