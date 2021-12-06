import React, { Fragment, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Alert from "./Alert";
import axiosClient from "../config/axios";

const NewTask = props => {

    const navigate = useNavigate();

    // const { user } = props;
    const [alert, setAlert] = useState({
        active: false,
        msg: '',
        danger: ''
    });

    const [task, setTask] = useState({
        description: ''
    });

    // Read form data
    const readForm = e => {
        setTask({
            [e.target.name]: e.target.value
        });
    }
    
    const addTask = e => {
        e.preventDefault();

        setAlert({
            active: false
        })

        // Validations
        if (!task.description) {
            setAlert({
                active: true,
                msg: 'The Description is required',
                danger: true
            });
            return;
        }
        
        // Petition with Axios
        axiosClient.post('/tasks', task)
            .then(response => {
                // // Update state
                // const { token, user } = response.data;
                // setUser(user);
                // setToken(token);

                setAlert({
                    active: true,
                    msg: 'Task added successfully',
                    danger: false
                });

                // // Redirect
                // navigate('/newtask');

            }).catch((err) => {
                console.log(err);
                console.log(err.response);

                navigate('/');
                
                // setErrors('The Email is already registered in the database');
                setAlert({
                    active: true,
                    msg: 'Task could not be added, please try again',
                    danger: true
                });
            });
    }

    return (
        <Fragment>
            <h1>NewTask</h1>

            <div className="col-xl-4 col-md-6 col-sm-10 mx-auto px-3">
                <form 
                    onSubmit={addTask}
                    className="bg-white p-5 bordered"
                >
                    <div className="form-group">
                        <label htmlFor="nombre">Description</label>
                        <input 
                            type="text" 
                            className="form-control form-control-lg" 
                            id="description" 
                            name="description" 
                            placeholder="Enter a description" 
                            onChange={readForm}
                        />
                    </div>

                    <input type="submit" className="btn btn-primary mt-3 w-100 p-3 text-uppercase font-weight-bold" value="Add" />

                    {alert.active ? <Alert alert={alert} /> : ''}
                </form>

                <div className="container mt-5 py-5">
                    <div className="row">
                        <div className="col-12 mb-5 d-flex justify-content-center">
                            <Link to={'/mytasks'} className="btn btn-info text-uppercase py-2 px-5 font-weight-bold">Go to my Tasks</Link>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

export default NewTask;