import React, { useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import { ToastContainer,toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";

function QuizDetails(){

    const [values,setValues] = useState([])
    const navigate = useNavigate()

    axios.defaults.withCredentials = true;
    useEffect(()=>{
        axios.get('https://parikshaserver.onrender.com/liveQuiz')
        .then(result=>{
            setValues(result.data);
        })
        .catch(error=>{
            console.log(error);
        })
    }, [])

    const redirect = (quizName) =>{
        navigate(`../Admin/leaderBoard/${quizName}`)
    }

    const deleteQuiz = (quizName) =>{
        axios.post('https://parikshaserver.onrender.com/deleteQuiz',{quizName})
        .then(result=>{
            if(result.data == "quiz deleted"){
                toast.success("Quiz Deleted Successfully");
            }
        })
        .catch(error=>{
            console.log(error);
        })
    }

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
                        <th scope="col">Name of the Quiz</th>
                        <th scope="col">Date/Time</th>
                        <th scope="col">Max Marks</th>
                        <th scope="col">Show Details</th>
                        <th scope="col">Delete</th>
                    </tr>
                </thead>
                <tbody>
                        {
                            values == null ? "" : values.map((value) => {
                                return <tr>
                                    <td>{value.quizName}</td>
                                    <td>{moment(value.quizDate).format('Do MMM YYYY, h:mm:ss a')}</td>
                                    <td>{value.Query == null ? "" : value.Query.length*4}</td>
                                    <td><button className="btn btn-outline-success" onClick={()=>redirect(value.quizName)} >Click here</button></td>
                                    <td><button className="btn btn-outline-danger" onClick={()=>deleteQuiz(value.quizName)} >Click here</button></td>
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
            <ToastContainer/>
        </div>
    )
}

export default QuizDetails;