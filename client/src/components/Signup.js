import { Fragment, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import axiosClient from "../config/axios";
import Alert from "./Alert";

const Signup = props => {

    const navigate = useNavigate();

    const { user, setUser, setToken } = props;
    const [alert, setAlert] = useState(false);
    const [errors, setErrors] = useState();

    // Read form data
    const readForm = e => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        });
    }

    // API consumption
    const signup = e => {
        e.preventDefault();

        // Validations
        if (!user.name || !user.email || !user.password) {
            setErrors('All fields are required');
            setAlert(true);
            return;
        }

        if (!user.password.length < 8) {
            setErrors('The password must be more than 8 digits');
            setAlert(true);
            return;
        }
        
        // Petition with Axios
        axiosClient.post('/users', user)
            .then(response => {

                // Update state
                const { token, user } = response.data;
                setUser(user);
                setToken(token);

                // Redirect
                navigate('/');
            }).catch((err) => {
                console.log(err)
                console.log(err.response)
                
                setErrors('The Email is already registered in the database');
                setAlert(true);
            });
    }

    return ( 
        <Fragment>
            <Navbar/>
            <h1>Signup</h1>

            <div className="col-xl-4 col-md-6 col-sm-10 mx-auto px-3">
                <form 
                    onSubmit={signup}
                    className="bg-white p-5 bordered"
                >
                    <div className="form-group">
                        <label htmlFor="nombre">Name</label>
                        <input 
                            type="text" 
                            className="form-control form-control-lg" 
                            id="name" 
                            name="name" 
                            placeholder="Enter your name" 
                            onChange={readForm}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="nombre">Email</label>
                        <input 
                            type="text" 
                            className="form-control form-control-lg" 
                            id="email" 
                            name="email" 
                            placeholder="Enter your email" 
                            onChange={readForm}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="propietario">Password</label>
                        <input 
                            type="password" 
                            className="form-control form-control-lg" 
                            id="password" 
                            name="password" 
                            placeholder="Enter a difficult password" 
                            onChange={readForm}
                        />
                    </div>

                    <input type="submit" className="btn btn-primary mt-3 w-100 p-3 text-uppercase font-weight-bold" value="Signup" />

                    {alert ? <Alert danger={true} errors={errors} /> : ''}
                </form>

                <div className="container mt-5 py-5">
                <div className="row">
                    <div className="col-12 mb-5 d-flex justify-content-center">
                        <Link to={'/'} className="btn btn-info text-uppercase py-2 px-5 font-weight-bold">Login</Link>
                    </div>
                </div>
            </div>
            </div>
        </Fragment>
    );
}
 
export default Signup;