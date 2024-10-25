import React from "react";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { ToastContainer,toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";

function Update() {

    const params = useParams()
    const email = params.email;

    const [name, setName] = useState([])
    const [gender, setGender] = useState([])
    const [mobile, setMobile] = useState([])
    const [qualification, setQualification] = useState([])
    const [dob, setDob] = useState([])
    const [city, setCity] = useState([])
    const [state, setState] = useState([])

    axios.defaults.withCredentials = true;
    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post('https://parikshaserver.onrender.com/update', { name, gender, email, mobile, qualification, dob, city, state })
            .then(result => {
                if(result.data === "updated" ){
                    toast.success("Updated Successfully");
                }
                else if(result.data === "failed" ){
                    toast.error("Email Id can't exist");
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
                    <div class="col-md-5">
                        <label for="name" class="form-label">Name</label>
                        <input type="text" class="form-control" onChange={(e) => setName(e.target.value)} placeholder="Enter your Name" />
                    </div>
                    <div class="col-md-5">
                        <label for="gender" class="form-label" >Gender</label>
                        <select class="form-select" name="gender" onChange={(e) => setGender(e.target.value)}>
                            <option selected >Choose...</option>
                            <option onChange={(e) => setGender(e.target.value)}>Male</option>
                            <option onChange={(e) => setGender(e.target.value)}>Female</option>
                        </select>
                    </div>
                    <div class="col-md-5">
                        <label for="mobile" class="form-label">Mobile Number</label>
                        <input type="number" class="form-control" onChange={(e) => setMobile(e.target.value)} placeholder="Enter Mobile number" />
                    </div>
                    <div class="col-md-5">
                        <label for="qualification" class="form-label" >Highest Qualification</label>
                        <select class="form-select" name="qualification" onChange={(e) => setQualification(e.target.value)}>
                            <option selected >Choose...</option>
                            <option onChange={(e) => setQualification(e.target.value)}>High School X</option>
                            <option onChange={(e) => setQualification(e.target.value)}>Inter Mediate XII</option>
                            <option onChange={(e) => setQualification(e.target.value)}>Bachelor's of Technology</option>
                            <option onChange={(e) => setQualification(e.target.value)}>Bachelor's of Science</option>
                            <option onChange={(e) => setQualification(e.target.value)}>Final Year of Graduation</option>
                            <option onChange={(e) => setQualification(e.target.value)}>Other's</option>
                        </select>
                    </div>
                    <div class="col-md-5">
                        <label for="dob" class="form-label">Date of Birth</label>
                        <input type="date" class="form-control" onChange={(e) => setDob(e.target.value)} />
                    </div>
                    <div class="col-md-5">
                        <label for="city" class="form-label">City</label>
                        <input type="text" class="form-control" onChange={(e) => setCity(e.target.value)} placeholder="Enter your City" />
                    </div>
                    <div class="col-md-5">
                        <label for="state" class="form-label" >State</label>
                        <select class="form-select" name="state" onChange={(e) => setState(e.target.value)}>
                            <option selected >Choose...</option>
                            <option onChange={(e) => setState(e.target.value)}>Uttar Pradesh</option>
                            <option onChange={(e) => setState(e.target.value)}>Madhya Pradesh</option>
                            <option onChange={(e) => setState(e.target.value)}>Haryana</option>
                            <option onChange={(e) => setState(e.target.value)}>Uttarakhand</option>
                            <option onChange={(e) => setState(e.target.value)}>Karnataka</option>
                            <option onChange={(e) => setState(e.target.value)}>Bihar</option>
                            <option onChange={(e) => setState(e.target.value)}>New Delhi</option>
                            <option onChange={(e) => setState(e.target.value)}>Other</option>
                        </select>
                    </div>
                    <div class="col-12">
                        <button type="submit" class="btn btn-outline-primary">Update</button>
                    </div>
                </form>
                <ToastContainer />
            </div>
            <br />

            <div class="footer">
                <br />
                <p>&copy; 2024 Designed, Developed and Hosted by National Informatics Center.</p>
                <br />
            </div>
        </div>
    )
}

export default Update;