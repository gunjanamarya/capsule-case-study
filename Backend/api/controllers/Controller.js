var mongoose = require('mongoose');
var Project = mongoose.model('Project');

exports.get_projects = function (req, res) {
    Project.find(function (err, projects) {
        if (err) res.json(err)
        res.json(projects)
    })
}