var ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn;
module.exports = function(app){
    var controller = app.controllers.home;

    //Production
    //app.get('/', ensureLoggedIn('/login'),controller.index);

    //DEVELOP
    app.get('/', controller.index);


};
