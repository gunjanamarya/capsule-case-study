var mongoose = require('mongoose');
var Project = mongoose.model('Project');
var User = mongoose.model('User');
var Parent_Task = mongoose.model('Parent_Task');
var Task = mongoose.model('Task');
var logger = require('../../winston');


exports.get_projects = function (req, res) {
    Project.find(function (err, projects) {
        res.status(200).json(projects);
    });
}

exports.get_projects_with_tasks = function (req, res) {
    var ObjectId = require('mongoose').Types.ObjectId;
    Task.aggregate(
        [
            {
                $match: {
                    projectId: new ObjectId(req.params.id)
                }
            },
            {
                $group: {
                    _id: "$projectId", count: { $sum: 1 }
                }
            }

        ], function (err, tasks) {
            if (err) { logger.error(err); res.status(500).send(err) };
            res.status(200).json(tasks);
        }
    )
}

exports.get_completed_tasks = function (req, res) {
    var ObjectId = require('mongoose').Types.ObjectId;
    Task.aggregate(
        [
            {
                $match: {
                    projectId: new ObjectId(req.params.id),
                    status: "completed"
                }
            },
            {
                $group: {
                    _id: "$projectId", count: { $sum: 1 }
                }
            }

        ], function (err, tasks) {
            if (err) { logger.error(err); res.status(500).send(err) };
            res.status(200).json(tasks);
        }
    )
}

exports.add_user = function (req, res) {
    var user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        employeeId: req.body.employeeId
    });
    user.save(function (err, user) {
        if (err) { logger.error(err); res.status(500).send(err) };
        res.status(200).json(user);
    });
}

exports.get_users = function (req, res) {
    User.find(function (err, users) {
        res.status(200).json(users);
    });
}

exports.update_user = function (req, res) {
    var ObjectId = require('mongoose').Types.ObjectId;
    User.findOne({ _id: new ObjectId(req.params.id) }, function (err, user) {
        if (err) { logger.error(err); res.status(500).send(err) };
        user.firstName = req.body.firstName;
        user.lastName = req.body.lastName;
        user.employeeId = req.body.employeeId;
        user.save(function (err, up_user) {
            if (err) { logger.error(err); res.status(500).send(err) };
            res.status(200).json(up_user);
        });
    });
}

exports.delete_user = function (req, res) {
    var ObjectId = require('mongoose').Types.ObjectId;
    User.findByIdAndDelete(new ObjectId(req.params.id), function (err, user) {
        if (err) { logger.error(err); res.status(500).send(err) };
        res.status(200).json(user);
    });
}

exports.search_user = function (req, res) {
    var ObjectId = require('mongoose').Types.ObjectId;
    User.find({ _id: new ObjectId(req.params.id) }, function (err, user) {
        if (err) { logger.error(err); res.status(500).send(err) };
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
        if (err) { logger.error(err); res.status(500).send(err) };
        res.status(200).json(project);
    });
}

exports.update_project = function (req, res) {
    var ObjectId = require('mongoose').Types.ObjectId;
    Project.findOne({ _id: new ObjectId(req.params.id) }, function (err, project) {
        if (err) { logger.error(err); res.status(500).send(err) };
        project.project = req.body.project;
        project.startDate = req.body.startDate;
        project.endDate = req.body.endDate;
        project.priority = req.body.priority;
        project.userId = req.body.userId;
        project.save(function (err, up_project) {
            if (err) { logger.error(err); res.status(500).send(err) };
            res.status(200).json(up_project);
        });
    });
}

exports.delete_project = function (req, res) {
    var ObjectId = require('mongoose').Types.ObjectId;
    Project.findByIdAndDelete(new ObjectId(req.params.id), function (err, project) {
        Parent_Task.deleteMany({ projectId: new ObjectId(req.params.id) }, function (err, parTask) {
            Task.deleteMany({ projectId: new ObjectId(req.params.id) }, function (err, task) {
                res.status(200).json({ "": "Records deleted successfully" });
            });
        });
    });
}

exports.search_project = function (req, res) {
    var ObjectId = require('mongoose').Types.ObjectId;
    Project.find({ _id: new ObjectId(req.params.id) }, function (err, project) {
        if (err) { logger.error(err); res.status(500).send(err) };
        res.status(200).json(project);
    });
}

exports.add_parent_task = function (req, res) {
    var parentObj = new Parent_Task({
        parentTask: req.body.parentTask,
        projectId: req.body.projectId
    });
    parentObj.save(function (err, parent) {
        if (err) { logger.error(err); res.status(500).send(err) };
        res.status(200).json(parent);
    });
}

exports.get_parents = function (req, res) {
    var ObjectId = require('mongoose').Types.ObjectId;
    Parent_Task.find({ projectId: new ObjectId(req.params.id) }, function (err, parents) {
        if (err) { logger.error(err); res.status(500).send(err) };
        res.status(200).json(parents);
    });
}

exports.add_sub_task = function (req, res) {
    var taskObj = new Task({
        userId: req.body.userId,
        projectId: req.body.projectId,
        parentTaskId: req.body.parentTaskId,
        task: req.body.task,
        priority: req.body.priority,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        status: 'started'
    });
    taskObj.save(function (err, task) {
        if (err) { logger.error(err); res.status(500).send(err) };
        res.status(200).json(task);
    });
}

exports.search_task = function (req, res) {
    var ObjectId = require('mongoose').Types.ObjectId;
    Task.find({ _id: new ObjectId(req.params.id) }, function (err, tasks) {
        if (err) { logger.error(err); res.status(500).send(err) };
        res.status(200).json(tasks);
    }).populate('parentTaskId', 'parentTask');
}

exports.get_tasks = function (req, res) {
    var ObjectId = require('mongoose').Types.ObjectId;
    Task.find({ projectId: new ObjectId(req.params.id) }, function (err, tasks) {
        if (err) { logger.error(err); res.status(500).send(err) };
        res.status(200).json(tasks);
    }).populate('parentTaskId', 'parentTask');

}


exports.complete_task = function (req, res) {
    var ObjectId = require('mongoose').Types.ObjectId;
    Task.findOne({ _id: new ObjectId(req.params.id) }, function (err, task) {
        if (err) { logger.error(err); res.status(500).send(err) };
        task.status = "completed";
        task.save(function (err, up_task) {
            if (err) { logger.error(err); res.status(500).send(err) };
            res.status(200).json(up_task);
        });
    });
}

exports.update_task = function (req, res) {
    var ObjectId = require('mongoose').Types.ObjectId;
    Task.findOne({ _id: new ObjectId(req.params.id) }, function (err, task) {
        if (err) { logger.error(err); res.status(500).send(err) };
        task.userId = req.body.userId;
        // task.projectId = req.body.projectId;
        task.parentTaskId = req.body.parentTaskId;
        task.task = req.body.task;
        task.startDate = req.body.startDate;
        task.endDate = req.body.endDate;
        task.priority = req.body.priority;
        task.save(function (err, up_task) {
            if (err) { logger.error(err); res.status(500).send(err) };
            res.status(200).json(up_task);
        });
    });
}