const mongoose = require('mongoose');


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
        type: String,
        required: true,
        unique: true
    }
}, { collection: 'User' })

module.exports = mongoose.model('User', UserSchema);