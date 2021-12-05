import React, { Fragment } from 'react'

const Alert = props => {

    const { danger, errors } = props;

    return (
        <Fragment>
            <div className={danger ? "alert alert-danger mt-5 text-center" : "alert alert-success mt-5 text-center"} role="alert">
                <ul>
                    <li>
                        {errors}
                    </li>
                    {/* {errors.foreach(err => (
                        <li>
                            {err.msg}
                        </li>
                    ))} */}
                </ul>
            </div>
        </Fragment>
    )
}

export default Alert;
