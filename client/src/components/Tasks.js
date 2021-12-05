import { Fragment, useEffect, useState } from "react";
import Navbar from "./Navbar";
import axiosClient from "../config/axios";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const Tasks = () => {

    const [tasks, setTasks] = useState([]);
    const [consult, setConsult] = useState(true);

    useEffect(() => {
        if (consult) {
            // API consumption
            const getTasks = () => {
                
                // Petition with Axios
                axiosClient.get('/tasks')
                    .then(response => {

                        // Update state
                        const { tasks } = response.data;
                        setTasks(tasks);
                        // console.log(tasks)

                        // Disable consult
                        setConsult(false);

                    }).catch((err) => {
                        // console.log(err);
                        // console.log(err.response);
                    });
            }

            getTasks();
        }
    });

    const taskUpdate = ( e, {id, description} ) => {
        const task = { 
            description,
            [e.target.name]: e.target.checked
        }

        // Petition with Axios
        axiosClient.put(`/tasks/${id}`, task)
            .then(response => {
                // console.log(response)

                // Enable consult to refresh list
                setConsult(true);

            }).catch((err) => {
                // console.log(err);
                // console.log(err.response);
            });
    }

    const taskDelete = id => {
        Swal.fire({
            title: 'Are you sure?',
            text: "A deleted Task cannot be recovered",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete',
            cancelButtonText: 'Cancel'

        }).then((result) => {
            if (result.isConfirmed) {
                // Alert
                Swal.fire(
                    'Task deleted!',
                    'The task was successfully removed',
                    'success'
                )
                    
                // Petition with Axios
                axiosClient.delete(`/tasks/${id}`)
                    .then(response => {
                        // console.log(response);

                        // Enable consult to refresh list
                        setConsult(true);

                    }).catch((err) => {
                        console.log(err);
                        console.log(err.response);
                    });
            }
        })  
    }

    return (
        <Fragment>
            <Navbar logout={true} />
            <h1>Tasks</h1>

            <div className="col-12 mb-5 d-flex justify-content-center">
                <Link to={'/newtask'} className="btn btn-success text-uppercase py-2 px-5 font-weight-bold">create a new task</Link>
            </div>

            <div className="col-lg-6 col-md-8 col-sm-10 mx-auto px-3">
                <ul className="list-group">
                    {tasks.map(task => (
                        <li className="list-group-item" key={task.id}>
                            <div className="row d-flex align-items-center">
                                <div className="col-11">
                                    <input 
                                        className="form-check-input me-4" 
                                        type="checkbox"
                                        key={task.id}
                                        name="done"
                                        checked={task.done}
                                        onChange={(e) => {taskUpdate(e, task)}}
                                    />
                                    {task.description}
                                </div>
                                <div className="col-1 d-flex justify-content-center">
                                    <button className="btn btn-danger" onClick={() => {taskDelete(task.id)}}>X</button>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </Fragment>
    );
}
 
export default Tasks;