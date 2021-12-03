const Task = require('../models/task');

const tasksGet = async (req, res) => {
    const parameters = { 
        user: req.user.id,
        state: true
    }
    const tasks = await Task.find(parameters);

    res.json({
        tasks
    });
}

const tasksPost = async (req, res) => {
    const { description } = req.body;

    const data = {
        description,
        user: req.user._id
    }

    const newTask = new Task( data );

    await newTask.save();

    res.status(201).json(newTask);
}

const tasksPut = async (req, res) => {
    const { id } = req.params;
    const { description, done } = req.body;

    const task = await Task.findByIdAndUpdate( id, { description, done } );

    res.json(task);
}

const tasksDelete = async (req, res) => {
    const { id } = req.params;

    const task = await Task.findByIdAndUpdate( id, { state: false} );

    res.json(task);
}

module.exports = {
    tasksGet,
    tasksPost,
    tasksPut,
    tasksDelete
}