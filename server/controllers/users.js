const User = require('../models/user');
const bcryptjs = require('bcryptjs');

const usersGet = async (req, res) => {
    const { limit = 20, from = 0 } = req.query;

    const parameters = { state: true }

    const [total, users ] = await Promise.all([
        User.countDocuments(parameters),
        User.find(parameters)
        .skip(Number (from))
        .limit(Number(limit))
    ])

    res.status(200).json({
        total,
        users
    });
}

const usersPost = async (req, res) => {
    const { name, email, password, role } = req.body;

    const user = new User( {name, email, password, role} );

    // Encrypt password
    const salt = bcryptjs.genSaltSync(10);
    user.password = bcryptjs.hashSync( password, salt);

    // Save to database
    await user.save();

    res.status(200).json({
        user
    });
}

const usersPut = async (req, res) => {
    const { id } = req.params;

    const { password, ...rest } = req.body;

    if ( password ) {
        const salt = bcryptjs.genSaltSync(10);
        rest.password = bcryptjs.hashSync( password, salt);
    }

    const user = await User.findByIdAndUpdate(id, rest);

    res.status(200).json(user);
}

const usersDelete = async (req, res) => {
    const { id } = req.params;
    const user = await User.findByIdAndUpdate( id, { state: false })

    res.status(200).json(user)
}

module.exports = {
    usersGet,
    usersPost,
    usersPut,
    usersDelete
}