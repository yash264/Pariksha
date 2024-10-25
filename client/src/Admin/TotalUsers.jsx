import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";

function TotalUsers(){

    const [values, setValues] = useState([])

    axios.defaults.withCredentials = true;
    useEffect(() => {
        axios.get('https://parikshaserver.onrender.com/totalUsers')
            .then(result => {
                setValues(result.data);
            })
            .catch(error => {
                console.log(error);
            })
    }, [])

    const filterSort = values== null ? "" : values.filter(data =>  data.type === "student" )
    .sort((a,b) => a.name > b.name ? 1 : -1)

    return(
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
                                <Link class="nav-link" to="../Admin/quizDetails">Quiz Details</Link>
                            </li>
                            <li class="nav-item">
                                <Link class="nav-link" to="../Admin/createQuiz">Create Quiz</Link>
                            </li>
                            <li class="nav-item">
                                <Link class="nav-link" to="../Admin/upload">Upload</Link>
                            </li>
                            <li class="nav-item">
                                <Link class="nav-link" to="../Admin/totalUsers">Total Users</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <table class="table">
                <thead>
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Gender</th>
                        <th scope="col">Email</th>
                        <th scope="col">Mobile No.</th>
                        <th scope="col">Home Town</th>
                    </tr>
                </thead>
                <tbody>
                {
                    values == null ? "" : filterSort.map(value =>{
                        return <tr>
                        <td>{value.name}</td>
                        <td>{value.gender}</td>
                        <td>{value.email}</td> 
                        <td>{value.mobile}</td> 
                        <td>{value.city}, {value.state}</td>
                        </tr> 
                    })   
                }
                </tbody>
            </table>

            <div class="footer">
                <br />
                <p>&copy; 2024 Designed, Developed and Hosted by National Informatics Center.</p>
                <br />
            </div>
        </div>
    )
}

export default TotalUsers;