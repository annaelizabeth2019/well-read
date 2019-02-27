var Library = require('../models/library');

module.exports = {
    index,
    handleResponse 
};

function index(req, res, next) {
    console.log(req.query)
    res.render('library/my-library', {
        user: req.user,
        name: req.query.name,
        Library
    });
};

function handleResponse(response) {
    for (var i = 0; i < response.items.length; i++) {
      var item = response.items[i];
      // in production code, item.text should have the HTML entities escaped.
      document.getElementById("content").innerHTML += "<br>" + item.volumeInfo.title;
    }
  }