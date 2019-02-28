var key = process.env.GOOGLE_API_KEY;
var request = require('request');
const rootUrl = 'https://www.googleapis.com/books/v1/volumes?q=';

module.exports = {
    index,
    search
};

function index(req, res, next) {
    console.log(req.query)
    res.render('top-sellers/index', {
        user: req.user,
        name: req.query.name
    });
};

function search(req, res, next) {
    const searchTerms = req.body.search;
    let searchQuery = searchTerms.toLowerCase().split(' ').join('+');
    var options = {
        url: rootUrl + searchQuery,
        headers: {
          'API_key': key
        }
      };
      request(options, function(err, response, body){
        var bookData = JSON.parse(body);
        // let authorsData;
        // let title, image;
        //   for (let i = 0; i < bookData.items.length; i++){
        //     image = bookData.items[i].volumeInfo.imageLinks.thumbnail;
        //     authorsData = bookData.items[i].volumeInfo.authors;
        // }
        console.log(bookData.items[1])
        res.render('library/search', {books: bookData.items, user: req.user, authorParser: authorParser, imgParser: imgParser})
    })
};

function authorParser(book) {
    return book === undefined ? 'Author Unknown' : 
    book.length === 1 ? book.toString() : book.join(', ');
  };

  function imgParser(data) {
    return data === undefined ? 'https://www.google.com/url?sa=i&source=images&cd=&cad=rja&uact=8&ved=2ahUKEwjkl-r1xN3gAhUM26wKHdK5DMMQjRx6BAgBEAU&url=https%3A%2F%2Fcommons.wikimedia.org%2Fwiki%2FFile%3ANo_image_available.svg&psig=AOvVaw2HovIDuMeG12BbSaS62hTI&ust=1551412724166613' : data;
  };