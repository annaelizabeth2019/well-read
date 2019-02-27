var key = process.env.GOOGLE_API_KEY;
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
    let searchQuery = searchTerms.toLocaleLowerCase().split(' ').join('+');
    var options = {
        url: rootUrl + searchQuery,
        headers: {
          'API_key': key
        }
      };
      request(options, function(err, response, body){
          res.render('/top-sellers/search', {bookData: body});
      });
    console.log('search:', options)
};