const mongoose = require('mongoose');

const ProjectSchema = mongoose.Schema({
    project: {
        type: String,
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    priority: {
        type: Number,
        required: true
    }
}, { collection: 'Project' })

module.exports = mongoose.model('Project', ProjectSchema);