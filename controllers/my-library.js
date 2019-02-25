module.exports = {
    index   
};

function index(req, res, next) {
    console.log(req.query)
    res.render('library/my-library', {
        user: req.user,
        name: req.query.name
    });
};