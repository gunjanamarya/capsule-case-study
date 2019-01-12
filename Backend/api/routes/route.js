'use strict';

module.exports = function (app) {
    var services = require('../controllers/Controller');

    app.route('/add-user')
        .post(services.add_user);

    app.route('/get-users')
        .get(services.get_users);

    app.route('/update-user/:id')
        .put(services.update_user);

    app.route('/delete-user/:id')
        .delete(services.delete_user);

    app.route('/search-user/:id')
        .get(services.search_user);

    app.route('/get-projects')
        .get(services.get_projects);

    app.route('/add-project')
        .post(services.add_project)

    app.route('/update-project/:id')
        .put(services.update_project);

    app.route('/delete-project/:id')
        .delete(services.delete_project);

    app.route('/search-project/:id')
        .get(services.search_project);

    app.route('/get-projects-with-tasks/:id')
        .get(services.get_projects_with_tasks);

    app.route('/get-completed-tasks/:id')
        .get(services.get_completed_tasks);

    app.route('/add-parent-task')
        .post(services.add_parent_task);

    app.route('/add-sub-task')
        .post(services.add_sub_task);

    app.route('/get-parent-tasks/:id')
        .get(services.get_parents);

    app.route('/search-task/:id')
        .get(services.search_task);

    app.route('/get-tasks/:id')
        .get(services.get_tasks);

    app.route('/complete-task/:id')
        .put(services.complete_task);

    app.route('/edit-task/:id')
        .put(services.update_task);
}