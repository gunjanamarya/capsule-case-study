var mongoose = require('mongoose');
var Project = mongoose.model('Project');
var User = mongoose.model('User');

exports.get_projects = function (req, res) {
    Project.find(function (err, projects) {
        if (err) res.status(500).send(err);
        res.status(200).json(projects);
    });
}

exports.add_user = function (req, res) {
    var user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        employeeId: req.body.employeeId
    });
    user.save(function (err, user) {
        if (err) res.status(500).send(err);
        res.status(200).json(user);
    });
}

exports.get_users = function (req, res) {
    User.find(function (err, users) {
        if (err) res.status(500).send(err);
        res.status(200).json(users);
    });
}

exports.update_user = function (req, res) {
    var ObjectId = require('mongoose').Types.ObjectId;
    User.findOne({ _id: new ObjectId(req.params.id) }, function (err, user) {
        if (err) res.json(err);
        user.firstName = req.body.firstName;
        user.lastName = req.body.lastName;
        user.employeeId = req.body.employeeId;
        user.save(function (err, up_user) {
            if (err) res.status(500).send(err);
            res.status(200).json(up_user);
        });
    });
}

exports.delete_user = function (req, res) {
    var ObjectId = require('mongoose').Types.ObjectId;
    User.findByIdAndDelete(new ObjectId(req.params.id), function (err, user) {
        if (err) res.status(500).send(err);
        res.status(200).json(user);
    });
}

exports.search_user = function (req, res) {
    var ObjectId = require('mongoose').Types.ObjectId;
    User.find({ _id: new ObjectId(req.params.id) }, function (err, user) {
        if (err) res.status(500).send(err);
        res.status(200).json(user);
    });
}

exports.add_project = function (req, res) {
    var projectObj = new Project({
        project: req.body.project,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        priority: req.body.priority,
        userId: req.body.userId
    });
    projectObj.save(function (err, project) {
        if (err) res.status(500).send(err);
        res.status(200).json(project);
    });
}

exports.update_project = function (req, res) {
    var ObjectId = require('mongoose').Types.ObjectId;
    Project.findOne({ _id: new ObjectId(req.params.id) }, function (err, project) {
        if (err) res.json(err);
        project.project = req.body.project;
        project.startDate = req.body.startDate;
        project.endDate = req.body.endDate;
        project.priority = req.body.priority;
        project.userId = req.body.userId;
        project.save(function (err, up_project) {
            if (err) res.status(500).send(err);
            res.status(200).json(up_project);
        });
    });
}

exports.delete_project = function (req, res) {
    var ObjectId = require('mongoose').Types.ObjectId;
    Project.findByIdAndDelete(new ObjectId(req.params.id), function (err, project) {
        if (err) res.status(500).send(err);
        res.status(200).json(project);
    });
}

exports.search_project = function (req, res) {
    var ObjectId = require('mongoose').Types.ObjectId;
    Project.find({ _id: new ObjectId(req.params.id) }, function (err, project) {
        if (err) res.status(500).send(err);
        res.status(200).json(project);
    });
}