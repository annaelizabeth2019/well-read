module.exports = {
    index   
};

function index(req, res, next) {
    console.log(req.user)
    res.render('library/index', {
        user: req.user,
        name: req.query.name,
    });
};