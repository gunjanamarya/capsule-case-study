const request = require('supertest');
const app = require('../index');
global.user_id = null;
global.project_id = null;

describe('Test Users API', function () {

    it('POST /add-user - should add a user', (done) => {
        let user = {
            "firstName": "stephan",
            "lastName": "jones",
            "employeeId": "233"
        }
        request(app)
            .post('/add-user')
            .send(user)
            .set('Accept', 'application/json')
            .expect(200)
            .end(function (err, res) {
                if (err) return done(err);
                global.user_id = res.body._id;
                // console.log(global.user_id)
                done();
            });
    });

    it('PUT /update-user/:id - should update a user', (done) => {
        let user = {
            "firstName": "stephan",
            "lastName": "jones",
            "employeeId": "2333"
        }
        request(app)
            .put('/update-user/' + global.user_id)
            .send(user)
            .set('Accept', 'application/json')
            .expect(200)
            .end(function (err, res) {
                if (err) return done(err);
                done();
            });
    });

    it('GET /get-users - should get all users', (done) => {
        request(app)
            .get('/get-users')
            .expect(200, done)
    });

    it('GET /search-user/:id - should search the user', (done) => {
        request(app)
            .get('/search-user/' + global.user_id)
            .expect(200, done)
    });

    it('DELETE /delete-user/:id - should delete the user', (done) => {
        request(app)
            .delete('/delete-user/' + global.user_id)
            .expect(200, done)
    });

});

describe('Test Projects API', function () {

    it('POST /add-project - should add a project', (done) => {
        let project = {
            endDate: "2019-01-11T00:00:00.000Z",
            priority: 26,
            project: "Demo Project",
            startDate: "2019-01-10T00:00:00.000Z",
            userId: global.user_id,
        }
        request(app)
            .post('/add-project')
            .send(project)
            .set('Accept', 'application/json')
            .expect(200)
            .end(function (err, res) {
                if (err) return done(err);
                global.project_id = res.body._id;
                done();
            });
    });

    it('PUT /update-project/:id - should update a project', (done) => {
        let project = {
            endDate: "2019-01-11T00:00:00.000Z",
            priority: 6,
            project: "Demo Project",
            startDate: "2019-01-10T00:00:00.000Z",
            userId: global.user_id,
        }
        request(app)
            .put('/update-project/' + global.project_id)
            .send(project)
            .set('Accept', 'application/json')
            .expect(200)
            .end(function (err, res) {
                if (err) return done(err);
                done();
            });
    });

    it('GET /get-projects - should get all projects', (done) => {
        request(app)
            .get('/get-projects')
            .expect(200, done)
    });

    it('GET /search-project/:id - should search the project', (done) => {
        request(app)
            .get('/search-project/' + global.project_id)
            .expect(200, done)
    });

    it('DELETE /delete-project/:id - should delete the project', (done) => {
        request(app)
            .delete('/delete-project/' + global.project_id)
            .expect(200, done)
    });

    it('GET /get-projects-with-tasks/:id - should give count of tasks in a project', (done) => {
        request(app)
            .get('/get-projects-with-tasks/' + global.project_id)
            .expect(200, done)
    });

    it('GET /get-completed-tasks/:id - should get completed tasks within a project', (done) => {
        request(app)
            .get('/get-completed-tasks/' + global.project_id)
            .expect(200, done)
    })
});



