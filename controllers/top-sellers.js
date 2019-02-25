module.exports = {
    index   
};

function index(req, res, next) {
    console.log(req.query)
    res.render('top-sellers/index', {
        user: req.user,
        name: req.query.name
    });
};