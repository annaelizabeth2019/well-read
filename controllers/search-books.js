var key = process.env.GOOGLE_API_KEY;
var request = require('request');
const rootUrl = 'https://www.googleapis.com/books/v1/volumes?q=';
const addUrl = 'https://www.googleapis.com/books/v1/volumes/';

module.exports = {
    index,
    search,
    addToLibrary
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
        res.render('library/search', {
        books: bookData.items, 
        authorParser: authorParser, 
        imgParser: imgParser, 
        user: req.user,
      });
      console.log(bookData.items)
    })
};

/* Checks for undefined authors and adds commas between names of multiple authors */
function authorParser(book) {
    return book === undefined ? 'Author Unknown' : 
    book.length === 1 ? book.toString() : book.join(', ');
  };

/* Checks for undefined image data */
  function imgParser(data) {
    return data === undefined ? "/images/no-img.png" : data.thumbnail;
  };

  function addToLibrary(req, res, next){
    var options = {
        url: rootUrl + req.params.id,
        headers: {
        'API_key': key
        }
      };
      request(options, function(err, response, body){
        var bookData = JSON.parse(body);
        res.render('library/search', {
        books: bookData.items, 
        authorParser: authorParser, 
        imgParser: imgParser, 
        user: req.user,
      })}
  };