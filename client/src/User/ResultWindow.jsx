import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";

function ResultWindow() {

    const params = useParams();
    const quizInfo = params.quizInfo;
    const email = params.email;

    const [values, setValues] = useState([])

    axios.defaults.withCredentials = true;
    useEffect(() => {
        axios.post('https://parikshaserver.onrender.com/particularQuizDetail', { quizInfo })
            .then(result => {
                setValues(result.data.data.Query);
            })
            .catch(error => {
                console.log(error);
            })
    }, [])

    const [response, setResponse] = useState([])
    const [correct, setCorrect] = useState(0)
    const [wrong, setWrong] = useState(0)

    useEffect(() => {
        axios.post('https://parikshaserver.onrender.com/result', { quizInfo, email })
            .then(result => {
                setResponse(result.data.Responses);
            })
            .catch(error => {
                console.log(error);
            })
    }, [])

    const checkScore = () => {
        if (correct + wrong < response.length) {
            if (response[correct + wrong].choosen === response[correct + wrong].rightAnswer) {
                setCorrect(correct + 1);
            }
            else if (response[correct + wrong].choosen !== response[correct + wrong].rightAnswer) {
                setWrong(wrong + 1);
            }
        }
    }
    checkScore();

    const setScore = () => {
        axios.post('https://parikshaserver.onrender.com/score', { quizInfo, email, correct, wrong })
            .then(result => {
                if(result.data.status==="ok"){
                    console.log("Score saves Successfully");
                }
            })
            .catch(error => {
                console.log(error);
            })
    }
    setScore();

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
            <br/>

            <div class="container text-center">
                <div class="row ">
                    <div class="col">
                        <br/><br/>
                        <h5 class="text-danger text-opacity-75" >Thankyou for Participating</h5>
                        <span>Stay connected with us and practise more to improve yourself. Having a wonderful Day.</span>
                    </div>
                    <div class="col">
                        <div class="shadow p-3 mb-5 bg-body-tertiary rounded">
                            <h6>Score : {correct==null || wrong==null ? "" : correct * 4 - wrong * 1} </h6>
                            <h6>Correct Answer : {correct==null ? "" : correct}</h6>
                            <h6>Wrong Answer :{wrong==null ? "" : wrong}</h6>
                            <h6>Total Marks : {values==null ? "" : values.length*4}</h6>
                            <h6>Total Attempted : {correct==null || wrong==null ? "" : correct + wrong} </h6>
                            <h6>No of Unattempts : {values==null || correct==null || wrong==null ? "" : values.length - correct - wrong} </h6>
                        </div>
                    </div>
                    
                </div>
            </div>

            <div class="container px-4 text-left">
                {
                    values == null ? "" : values.map((value) => {
                        return (
                            <div>
                                <h6>{value.question}</h6>
                                <div class="row">
                                    <div class="col">
                                        A. {value.opt1}
                                    </div>
                                    <div class="col">
                                        B. {value.opt2}
                                    </div>
                                    <div class="col">
                                        C. {value.opt3}
                                    </div>
                                    <div class="col">
                                        D. {value.opt4}
                                    </div>
                                </div>
                                Correct Answer : <span>{value.answer}</span>
                                <br /><br />
                            </div>
                        )
                    })
                }
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

export default ResultWindow;