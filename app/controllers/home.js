module.exports = function(app) {
    var controller = {};

    controller.index = function(req, res) {
        res.render('index', {
            'user': 'express'
        });
    };

    controller.login = function(req, res) {
        res.render('login/login');
    };

    return controller;
};
