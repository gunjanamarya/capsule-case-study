const request = require('supertest');
const app = require('../index');

describe('Test Users API', function () {

    it('GET /get-users - should get all users', (done) => {
        request(app)
            .get('/get-users')
            .expect(200, done)
    });

    it('POST /add-user - should add a user', (done) => {
        let user = {
            "firstName": "stephan",
            "lastName": "jones",
            "employeeId": "23"
        }
        request(app)
            .post('/add-user')
            .send(user)
            .set('Accept', 'application/json')
            .expect(200)
            .end(function (err, res) {
                if (err) return done(err);
                done();
            });
    });


    it('PUT /update-user/:id - should update a user', (done) => {
        let user = {
            "firstName": "alexandra",
            "lastName": "danvers",
            "employeeId": "1112"
        }
        request(app)
            .put('/update-user/5c36f935fdbef001f44f3413')
            .send(user)
            .set('Accept', 'application/json')
            .expect(200)
            .end(function (err, res) {
                if (err) return done(err);
                done();
            });
    });

});


