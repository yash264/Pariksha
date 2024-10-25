import React from "react";
import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";

function PastQuiz(){

    const params = useParams()
    const email = params.email;

    const [data, setData] = useState([])
    const [message, setMessage] = useState([])
    const navigate = useNavigate()

    axios.defaults.withCredentials = true;
    useEffect(()=>{
        axios.post('https://parikshaserver.onrender.com/pastQuizes',{email})
            .then(result => {
                setData(result.data.data);
                setMessage(result.data.message);
            })
            .catch(error => {
                console.log(error);
            })
    }, [email]) 

    const merge = [];
    const combine = () => {
        for (let i = 0; i < data.length; i++) {
            merge.push({
                quiz: message[i],
                response: data[i]
            });
        }
    }
    combine();
    
    const redirect = (quizName,email) =>{
        navigate(`../User/resultWindow/${email}/${quizName}`)
    }

    const filterSort = merge== null ? "" : merge.sort((a,b) => a.quiz.quizDate < b.quiz.quizDate ? 1 : -1)
    
    
    return(
        <div>
            <div class="header">
                <img src={require("../pariksha.jpg")} />
            </div>

            <nav class="navbar navbar-expand-lg bg-body-tertiary">
                <div class="container-fluid">
                    <a class="navbar-brand" href="#">Navbar</a>
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
                        <th scope="col">Date/Time</th>
                        <th scope="col">Marks Scored</th>
                        <th scope="col">Max marks</th>
                        <th scope="col">Show Result</th>
                    </tr>
                </thead>
                <tbody>
                {
                        filterSort == null ? "" : filterSort.map((value) => {
                            return <tr>
                                <td>{value==null ? "" : value.quiz.quizName}</td>
                                <td>{value==null ? "" : moment(value.quiz.quizDate).format('Do MMM YYYY, h:mm:ss a')}</td>
                                <td>{value==null ? "" :value.response.score}</td>
                                <td>{value==null ? "" :value.response.correct*4 + value.response.wrong*4}</td>
                                <td><button className="btn btn-outline-success" onClick={()=>redirect(value.quiz.quizName,value.response.quizId.slice(value.quiz.quizName.length+1,value.response.quizId.lenght))} >Click here</button></td>
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

export default PastQuiz;
