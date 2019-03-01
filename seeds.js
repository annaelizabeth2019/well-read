var p = new Promise(function(resolve, reject) {
    function index(req, res, next) {
        Library.findOne(req.user, function(err, library) {
            return library.books
        });
    }
})

p.then(function(books){
    let booksArr = []
    books.forEach(function(b){
        findById(b, function(book){
            booksArr.push(book);
        });
        return booksArr;
    })
.then(function(booksArr){
    res.render('library/my-library', {
        user: req.user,
        name: req.query.name,
        books: booksArr
        });
})