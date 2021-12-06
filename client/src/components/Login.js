import { Fragment, useState } from "react";
import { Link, useNavigate, Navigate } from "react-router-dom";
import axiosClient from "../config/axios";
import Alert from "./Alert";
// import { handleSession } from "../helpers/session";

const Login = props => {

    const navigate = useNavigate();

    const { user, setUser, setToken } = props;
    const [alert, setAlert] = useState({
        active: false,
        msg: '',
        danger: ''
    });

    // Read form data
    const readForm = e => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        });
    }

    // API consumption
    const login = e => {
        e.preventDefault();

        // Validation
        if (!user.email || !user.password) {
            setAlert({
                active: true,
                msg: 'All fields are required',
                danger: true
            });
            return;
        }
        
        // Petition with Axios
        axiosClient.post('/auth/login', user)
            .then(result => {
                // console.log(result.data);

                // Update state
                const { token, user } = result.data;
                setUser(user);
                setToken(token);
                axiosClient.defaults.headers.common["x-token"] = token;

                // Save Token in LocalStorage
                window.localStorage.setItem('loggedToDoAppUser', JSON.stringify(result.data));

                // Redirect
                navigate('/mytasks');

            }).catch((err) => {
                // console.log(err)
                // console.log(err.response)
                
                setAlert({
                    active: true,
                    msg: 'Invalid email or password',
                    danger: true
                });
            });
    }

    return ( 
        // user ? <Navigate to='/mytasks' />
        // :
        <Fragment>
            <h1>Login</h1>

            <div className="col-xl-4 col-md-6 col-sm-10 mx-auto px-3">
                <form 
                    onSubmit={login}
                    className="bg-white p-5 bordered"
                >
                    <div className="form-group">
                        <label htmlFor="nombre">Email</label>
                        <input 
                            type="text" 
                            className="form-control form-control-lg" 
                            id="email" 
                            name="email" 
                            placeholder="Your email" 
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
                            placeholder="Your password" 
                            onChange={readForm}
                        />
                    </div>

                    <input type="submit" className="btn btn-primary mt-3 w-100 p-3 text-uppercase font-weight-bold" value="Login" />

                    {alert.active ? <Alert alert={alert} /> : ''}
                </form>

                <div className="container mt-5 py-5">
                <div className="row">
                    <div className="col-12 mb-5 d-flex justify-content-center">
                        <Link to={'/signup'} className="btn btn-info text-uppercase py-2 px-5 font-weight-bold">Signup</Link>
                    </div>
                </div>
            </div>
            </div>
        </Fragment>
    );
}
 
export default Login;