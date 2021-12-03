const User = require('../models/user')

const emailExist = async (email = '') => {

    const existeEmail = await User.findOne( { email } )
    if ( existeEmail ) {
        throw new Error (`The Email ${email} is already registered in the database`);
    }
}

module.exports = {
    emailExist
}