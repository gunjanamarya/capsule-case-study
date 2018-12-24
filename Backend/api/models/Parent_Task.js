const mongoose = require('mongoose');

const ParentTaskSchema = mongoose.Schema({
    parentTask: {
        type: String,
        required: true
    }
}, { collection: 'Parent_Task' })

module.exports = mongoose.model('Parent_Task', ParentTaskSchema);