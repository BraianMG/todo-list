const { Schema, model } = require('mongoose');

const UserSchema = Schema({

    name: {
        type: String,
        required: [true, 'The Name is required']
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'The Email is required']
    },
    password: {
        type: String,
        required: [true, 'The Password is required']
    },
    role:{
        type: String,
        required: true,
        default: 'USER_ROLE',
        enum: ['ADMIN_ROLE','USER_ROLE']
    },
    google: {
        type: Boolean,
        default: false
    },
    state: {
        type: Boolean,
        default: true
    }
});

UserSchema.methods.toJSON = function() {
    const { __v, password, _id, ...user } = this.toObject();
    user.id = _id;
    
    return user;
}

module.exports = model('User', UserSchema);