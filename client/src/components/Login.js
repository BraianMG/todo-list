import { Fragment, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import axiosClient from "../config/axios";
import Alert from "./Alert";

const Login = props => {

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
    const login = e => {
        e.preventDefault();

        // Validation
        if (!user.email || !user.password) {
            setErrors('All fields are required');
            setAlert(true);
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

                // Redirect
                navigate('/mytasks');

            }).catch((err) => {
                // console.log(err)
                // console.log(err.response)
                
                setErrors('Invalid email or password');
                setAlert(true);
            });
    }

    return ( 
        <Fragment>
            <Navbar logout={false} />
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

                    {alert ? <Alert danger={true} errors={errors} /> : ''}
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