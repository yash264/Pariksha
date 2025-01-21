import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer,toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";

function Register() {
    const [name, setName] = useState()
    const [gender, setGender] = useState()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [loading, setLoading] = useState(false);

    axios.defaults.withCredentials = true;
    const handleSubmit = (e) => {
        e.preventDefault()
        setLoading(true);
        
        axios.post('https://parikshaserver.onrender.com/register', { name, gender, email, password })
            .then(result => {
                if(result.data === "Email Already Exists"){
                    toast.error("Email Id Already Exists")
                }
                else if(result.data === "registered"){
                    toast.success("Registered Successfully");
                }
                setLoading(false);
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
                        <input type="text" class="form-control" onChange={(e) => setName(e.target.value)} placeholder="Enter your Name" />
                        <label for="floatingInput">Name </label>
                    </div>
                    <select class="form-select" aria-label="Default select example" onChange={(e) => setGender(e.target.value)}>
                        <option selected>--Gender--</option>
                        <option onChange={(e) => setGender(e.target.value)}>Male</option>
                        <option onChange={(e) => setGender(e.target.value)}>Female</option>
                    </select>
                    <br />
                    <div class="form-floating mb-3">
                        <input type="email" class="form-control" onChange={(e) => setEmail(e.target.value)} placeholder="Enter Email Address" />
                        <label for="floatingInput">Email address </label>
                    </div>
                    <div class="form-floating">
                        <input type="password" class="form-control" onChange={(e) => setPassword(e.target.value)} placeholder="Enter Password" />
                        <label for="floatingPassword">Password </label>
                    </div>
                    <br />
                    {
                        loading && 
                        <div className="spinner-border text-primary mt-2" role="status">
                        </div>
                    }
                    <button type="submit" class="btn btn-primary">Register</button>
                </form>
                <ToastContainer/>
            </div>
            <br/>

            <div class="footer">
                <br />
                <p>&copy; 2024 Designed, Developed and Hosted by National Informatics Center.</p>
                <br />
            </div>
        </div>
    );
}

export default Register;
