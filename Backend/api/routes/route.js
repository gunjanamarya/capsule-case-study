'use strict';

module.exports = function (app) {
    var services = require('../controllers/Controller');

    app.route('/get-projects')
        .get(services.get_projects);
}