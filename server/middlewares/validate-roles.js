const isAdminRole = (req, res, next) => {
    
    if ( !req.user ) {
        return res.status(500).json({
            msg: 'You want to verify the role without validating the token first'
        });
    }

    const { role, name } = req.user;
    
    if( role !== 'ADMIN_ROLE' ){
        return res.status(401).json({
            msg: `${name} is not an administrator, you can't do this`
        });
    }

    next();
}

module.exports = {
    isAdminRole
}