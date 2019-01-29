const request = require('supertest');
const app = require('../index');
global.user_id = null;
global.project_id = null;
global.parent_id = null;
global.child_id = null;

describe('Test Users API', function () {

    it('POST /add-user - should add a user', (done) => {
        let user = {
            lastName: "jones",
            employeeId: "233"
        }
        request(app)
            .post('/add-user')
            .send(user)
            .set('Accept', 'application/json')
            .expect(500)
            .end(function (err, res) {
                if (err) return done(err);
                global.user_id = res.body._id;
                // console.log(global.user_id)
                done();
            });
    });

});

describe('Test Projects API', function () {

    it('POST /add-project - should add a project', (done) => {
        let project = {
            endDate: "2019-01-11T00:00:00.000Z",
            project: "Demo Project",
            startDate: "2019-01-10T00:00:00.000Z",
            userId: global.user_id,
        }
        request(app)
            .post('/add-project')
            .send(project)
            .set('Accept', 'application/json')
            .expect(500)
            .end(function (err, res) {
                if (err) return done(err);
                global.project_id = res.body._id;
                done();
            });
    });
});


describe('Test Tasks API', function () {

    it('POST /add-parent-task - should add a parent task', (done) => {
        let parent = {
            projectId: global.project_id
        }
        request(app)
            .post('/add-parent-task')
            .send(parent)
            .set('Accept', 'application/json')
            .expect(500)
            .end(function (err, res) {
                if (err) return done(err);
                global.parent_id = res.body._id;
                done();
            });
    });

    it('POST /add-sub-task - should add a child task', (done) => {
        let child = {
            parentTaskId: global.parent_id,
            projectId: global.project_id,
            task: "Sample Child Task",
            startDate: "2019-01-10T00:00:00.000Z",
            endDate: "2019-01-11T00:00:00.000Z",
            priority: 10,
            status: "started"
        }
        request(app)
            .post('/add-sub-task')
            .send(child)
            .set('Accept', 'application/json')
            .expect(500)
            .end(function (err, res) {
                if (err) return done(err);
                global.child_id = res.body._id;
                done();
            });
    });
});