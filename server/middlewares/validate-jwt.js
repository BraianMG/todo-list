const User = require('../models/user');
const jwt = require('jsonwebtoken');


const validateJWT = async ( req, res, next ) => {

    const token = req.header('x-token');

    if( !token ) {
        return res.status(401).json({
            msg: 'Token not found'
        });
    }

    try {
        const { id } = jwt.verify( token, process.env.SECRETJWT );
        const user = await User.findById( id )

        // Check if the user exists
        if ( !user ) {
            return res.status(401).json({
                msg: 'The user does not exist in the database'
            })
        }

        // Check if the user is active, that is, the status is TRUE
        if( !user.state ) {
            return res.status(401).json({
                msg: 'User has status in FALSE'
            })
        }

        req.user = user;
        next();
        
    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg: 'Invalid token'
        })
    }
}

module.exports = {
    validateJWT
}
 