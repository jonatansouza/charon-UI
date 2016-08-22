module.exports = function(app) {
    var controller = {};
    var Admin = app.models.admin;
    controller.index = function(req, res) {
        res.render('index', {
            'user': 'express'
        });
    };

    controller.login = function(req, res) {
        res.render('login/login', {
            message: req.flash('error')
        });
    };

    controller.logout = function(req, res) {
        req.logout();
        res.redirect('/');
    };

    controller.signup = function(req, res){
      res.render('login/signup');
    }

    controller.saveAdmin = function(req, res) {
        var admin = new Admin();
        admin.username = req.body.username;
        admin.password = req.body.password;

        Admin.findOrCreate({
            'username': admin.username
        }, admin, function(err, admin, create) {
            if (create) {
                admin.save(function(err, admin) {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log('created' + admin);
                    }
                })
            }
            if (err) {
                console.log(err);
            }
        });
        res.redirect('/');
    };

    return controller;
};
