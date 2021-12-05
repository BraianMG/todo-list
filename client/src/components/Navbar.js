import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import logo from '../logo.jpg'

const Navbar = props => {

    const { logout } = props;

    return (
        <Fragment>
            <div className="col-md-8 mx-auto">
                <div className="container">
                    {/* <div className="row justify-content-center justify-content-md-between align-items-center py-4"> */}
                    <div className="d-flex justify-content-between align-items-center py-3">
                        <div className="col-sm-2">
                            <Link to='/' >
                                <img className="img-fluid rounded logo" src={logo} alt="ToDo List Logo"/>
                            </Link>
                        </div>
                        <div className="col-sm-10 d-flex justify-content-end">
                            { logout ? <Link to='/' className="btn btn-danger text-uppercase px-5">Log out</Link> : '' }
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default Navbar;