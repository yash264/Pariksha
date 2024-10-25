import React from "react";
import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";

function LiveQuiz(){

    const params = useParams()
    const email = params.email;

    const [values,setValues] = useState(null)
    const navigate = useNavigate()

    axios.defaults.withCredentials = true;
    useEffect(()=>{
        axios.get('https://parikshaserver.onrender.com/liveQuiz')
            .then(result => {
                setValues(result.data);
            })
            .catch(error => {
                console.log(error);
            })
    }, []) 

    const redirect = (quizName) =>{
        navigate(`../User/quizLogin/${quizName}`)
    }

    const filterSort = values== null ? "" : values.filter(data =>  data.type === "quizDetails" )
    .sort((a,b) => a.quizDate < b.quizDate ? 1 : -1)

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

            <table class="table">
                <thead>
                    <tr>
                        <th scope="col">Name of the Quiz</th>
                        <th scope="col">Topics Covered</th>
                        <th scope="col">Date/Time</th>
                        <th scope="col">Max Marks</th>
                        <th scope="col">Start</th>
                    </tr>
                </thead>
                <tbody>
                        {
                            values == null ? "" : filterSort.map((value) => {
                                return <tr>
                                    <td>{value.quizName}</td>
                                    <td>{value.topics}</td>
                                    <td>{moment(value.quizDate).format('Do MMM YYYY, h:mm:ss a')}</td>
                                    <td>{value.Query.length*4}</td>
                                    <td><button className="btn btn-outline-success" onClick={()=>redirect(value.quizName)} >Click here</button></td>
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

export default LiveQuiz;