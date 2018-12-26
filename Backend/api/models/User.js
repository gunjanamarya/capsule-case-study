const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    employeeId: {
        type: Number,
        required: true,
        unique: true
    },
    projectId: {
        type: Schema.Types.ObjectId,
        ref: 'Project',
        // required: true
    },
    taskId: {
        type: Schema.Types.ObjectId,
        ref: 'Task',
        // required: true
    }
}, { collection: 'User' })

module.exports = mongoose.model('User', UserSchema);