var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

module.exports = function(app) {

    var Admin = app.models.admin;

    function findById(id, fn) {
        Admin.findById(id, function(err, admin) {
            return fn(err, admin);
        });
    }

    function findByEmail(username, fn) {

        Admin.findOne({
                'username': username
            })
            .then(
                function(admin) {
                    return fn(null, admin);
                },
                function(error) {
                    return fn(error, null);
                });
    }

    passport.serializeUser(function(admin, done) {
        done(null, admin.id);
    });

    passport.deserializeUser(function(id, done) {
        findById(id, function(err, admin) {
            done(err, admin);
        });
    });
    passport.use(new LocalStrategy(
        function(username, password, done) {
            findByEmail(username, function(err, user) {
                if (err) {
                    return done(err);
                }
                if (!user) {
                    return done(null, false, {
                        message: 'Usuario inválido!'
                    });
                }

                user.comparePassword(password, function(err, isMatch) {
                    if (!isMatch) {
                        return done(null, false, {
                            message: 'Usuario ou Senha inválida!'
                        });
                    } else {
                        return done(null, user);
                    }
                });
            });
        }
    ));

};
