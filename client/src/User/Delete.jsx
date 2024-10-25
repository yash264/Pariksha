import React from "react";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";

function Delete() {

    const params = useParams()
    const email = params.email;

    const [password, setPassword] = useState([])

    axios.defaults.withCredentials = true;
    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post('https://parikshaserver.onrender.com/delete', { email, password })
            .then(result => {
                console.log(result);
                if(result.data === "deleted"){
                    toast.success("Account Deleted");
                }
                else if(result.data === "Incorrect Password"){
                    toast.error("Incorrect Password");
                }
            })
            .catch(error => {
                console.log(error);
            })
    }

    return (
        <div>
            <div class="header">
                <img src={require("../pariksha.jpg")} />
            </div>

            <nav class="navbar navbar-expand-lg bg-body-tertiary">
                <div class="container-fluid">
                    <a class="navbar-brand" href="#">Services</a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                            <li class="nav-item">
                                <Link class="nav-link" to={`../User/dashboard/${email}`}>Dashboard</Link>
                            </li>
                            <li class="nav-item">
                                <Link class="nav-link" to={`../User/liveQuiz/${email}`}>Live Quiz</Link>
                            </li>
                            <li class="nav-item">
                                <Link class="nav-link" to={`../User/pastQuiz/${email}`}>Past Quizes</Link>
                            </li>
                            <li class="nav-item">
                                <Link class="nav-link" to={`../User/studyMaterial/${email}`}>Study Material</Link>
                            </li>
                            <li class="nav-item dropdown">
                                <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Profile
                                </a>
                                <ul class="dropdown-menu">
                                    <Link class="nav-link" to={`../User/update/${email}`}>Update</Link>
                                    <Link class="nav-link" to={`../User/delete/${email}`}>Delete</Link>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            <div class="container px-4 text-center">
                <form class="row g-3" onSubmit={handleSubmit}>
                    <div class="col-md-6">
                        <label for="password" class="form-label">Password</label>
                        <input type="password" class="form-control" onChange={(e) => setPassword(e.target.value)} placeholder="Enter your Password" />
                    </div>
                    <span style={{color:"red"}}>* Remember this action is permanent. Once an account is deleted, data can't be retreived.</span>
                    <div class="col-12">
                        <button type="submit" class="btn btn-outline-primary">Delete Account</button>
                    </div>
                </form>
                <ToastContainer />
            </div>
            <br/>

            <div class="footer">
                <br />
                <p>&copy; 2024 Designed, Developed and Hosted by National Informatics Center.</p>
                <br />
            </div>
        </div>
    )
}

export default Delete;
