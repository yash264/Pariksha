import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer,toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";

function Login() {
    const [email, setEmail] = useState([])
    const [password, setPassword] = useState([])
    const navigate = useNavigate()

    axios.defaults.withCredentials = true;
    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('https://parikshaserver.onrender.com/login', { email, password })
            .then(result => {
                if(result.data === "success"){
                    navigate(`../User/dashboard/${email}`);
                }
                else if(result.data === "Incorrect Password"){
                    toast.error("Incorrect Password");
                }
                else if(result.data === "Please Register"){
                    toast.error("Please Register");
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

            <nav class="navbar navbar-expand-lg bg-body-tertiary"  >
                <div class="container-fluid">
                    <a class="navbar-brand" href="#">Services</a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                            <li class="nav-item">
                                <Link class="nav-link" to="../">Home</Link>
                            </li>
                            <li class="nav-item">
                                <Link class="nav-link" to="../User/register">Register</Link>
                            </li>
                            <li class="nav-item">
                                <Link class="nav-link" to="../User/login">Login</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <br />

            <div class="container px-4 text-center">
                <form onSubmit={handleSubmit}>
                    <div class="form-floating mb-3">
                        <input type="email" name="email" class="form-control" onChange={(e) => setEmail(e.target.value)} placeholder="Enter Email Address" />
                        <label for="floatingInput">Email address</label>
                    </div>
                    <div class="form-floating">
                        <input type="password" class="form-control" name="password" onChange={(e) => setPassword(e.target.value)} placeholder="Enter Password" />
                        <label for="floatingPassword">Password</label>
                    </div>
                    <br />
                    <button type="submit" class="btn btn-primary">Login</button>
                </form>
                <br />
                <ToastContainer/>
            </div>

            <div class="footer">
                <br />
                <p>&copy; 2024 Designed, Developed and Hosted by National Informatics Center.</p>
                <br />
            </div>
        </div>
    );
}

export default Login;
