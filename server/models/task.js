const { Schema, model } = require('mongoose');

const TaskSchema = Schema({

    description: {
        type: String,
        required: [true, 'The Description is required']
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    done: {
        type: Boolean,
        default: false
    },
    state: {
        type: Boolean,
        default: true
    }
});

TaskSchema.methods.toJSON = function() {
    const { __v, _id, state, ...tasks } = this.toObject();
    tasks.id = _id;

    return tasks;
}

module.exports = model('Task', TaskSchema);