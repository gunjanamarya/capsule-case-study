var mongoose = require('mongoose');
var Project = mongoose.model('Project');
var User = mongoose.model('User');

exports.get_projects = function (req, res) {
    Project.find(function (err, projects) {
        if (err) res.json(err)
        res.json(projects)
    });
}

exports.add_user = function (req, res) {
    var user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        employeeId: req.body.employeeId
    });
    user.save(function (err, user) {
        if (err) res.json(err)
        res.json(user)
    });
}

exports.get_users = function (req, res) {
    User.find(function (err, users) {
        if (err) res.json(err)
        res.json(users)
    });
}

// Check again
exports.update_user = function (req, res) {
    var ObjectId = require('mongoose').Types.ObjectId;
    User.findOne({ _id: new ObjectId(req.params.id) }, function (err, user) {
        if (err) res.json(err);
        user.firstName = req.body.firstName;
        user.lastName = req.body.lastName;
        user.employeeId = req.body.employeeId;
        user.save(function (err, up_user) {
            if (err) res.json(err);
            res.json(up_user)
        });
    });
}

exports.delete_user = function (req, res) {
    var ObjectId = require('mongoose').Types.ObjectId;
    User.findByIdAndDelete(new ObjectId(req.params.id), function (err, user) {
        if (err) res.json(err)
        res.json(user)
    });
}

exports.search_user = function (req, res) {
    var ObjectId = require('mongoose').Types.ObjectId;
    User.find({ _id: new ObjectId(req.params.id) }, function (err, user) {
        if (err) res.json(err)
        res.json(user)
    });
}