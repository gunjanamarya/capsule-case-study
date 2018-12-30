const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ParentTaskSchema = mongoose.Schema({
    parentTask: {
        type: String,
        required: true,
        // unique: true
    },
    projectId: {
        type: Schema.Types.ObjectId,
        ref: 'Project',
        required: true
    }
}, { collection: 'Parent_Task' })

module.exports = mongoose.model('Parent_Task', ParentTaskSchema);