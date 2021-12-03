const User = require('../models/user');
const bcryptjs = require('bcryptjs');
const { generateJWT } = require('../helpers/generate-jwt');

const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if the email exists
        const user = await User.findOne( { email } );

        if ( !user ) {
            return res.status(400).json({
                msg: 'The Email does not exist in the DB'
            })
        }

        // Check if the user is active, that is, the status is TRUE
        if ( !user.state ) {
            return res.status(400).json({
                msg: 'User has status in FALSE'
            })
        }

        // Check if the password is correct
        const validPassword = bcryptjs.compareSync( password, user.password );

        if ( !validPassword ) {
            return res.status(400).json({
                msg: 'Password is incorrect'
            })
        }

        // Generate the JWT
        const token = await generateJWT(user.id);

        res.json({
            user,
            token
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Something happened with the backend'
        })
    }
}

module.exports = {
    login
}