import React from "react";
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";
import moment from "moment";
import axios from "axios";
import { ToastContainer,toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";

function QuizWindow() {

    const location = useLocation()
    const quizInfo = location.state.quizName;
    const email = location.state.email;

    const [values, setValues] = useState([])
    const [duration, setDuration] = useState([])

    axios.defaults.withCredentials = true;
    useEffect(() => {
        axios.post('https://parikshaserver.onrender.com/particularQuizDetail', { quizInfo })
            .then(result => {
                setDuration(result.data.data.duration);
                setValues(result.data.data.Query);
            })
            .catch(error => {
                console.log(error);
            })
    }, [])

    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [clickedOption, setClickedOption] = useState(0);

    const nextQuestion = () => {
        if (currentQuestion < values.length - 1) {
            setClickedOption(0);
            setCurrentQuestion(currentQuestion + 1);
            showSavedAnswer();
        }
    }

    const previousQuestion = () => {
        if (currentQuestion > 0) {
            setClickedOption(0);
            setCurrentQuestion(currentQuestion - 1);
            showSavedAnswer();
        }
    }

    const clearResponses = () => {
        setClickedOption(0);
        clearAnswers();
    }

    const saveQuestion = () => {
        setClickedOption(0);
        savedAnswers();
    }

    const correctAnswer = values[currentQuestion];

    const savedAnswers = async () => {
        const result = await axios.post('https://parikshaserver.onrender.com/savedAnswer', { email, quizInfo, currentQuestion, clickedOption, correctAnswer });
        showSavedAnswer();
    }

    const clearAnswers = async () => {
        const result = await axios.post('https://parikshaserver.onrender.com/clearAnswer', { email, quizInfo, currentQuestion, clickedOption });
        showSavedAnswer();
    }

    const [markedOption, setMarkedOption] = useState([])

    const showSavedAnswer = () => {
        axios.post('https://parikshaserver.onrender.com/result', { quizInfo, email })
            .then(result => {
                setMarkedOption(result.data.Responses);
            })
            .catch(error => {
                console.log(error);
            })
    };

    const filterSort = markedOption == null ? "" : markedOption.sort((a, b) => a.questionId > b.questionId ? 1 : -1)
        .filter(value => value.questionId === currentQuestion)

    const [time, setTime] = useState([])

    useEffect(() => {
        axios.post('https://parikshaserver.onrender.com/result', { quizInfo, email })
            .then(result => {
                setTime(result.data.quizDate);
            })
            .catch(error => {
                console.log(error);
            })
    }, [])

    const deadline = moment(time).add(duration,'minute').format();

    const [second, setSecond] = useState([])
    const [minute, setMinute] = useState([])

    const getTimeLeft = (samapt) => {
        const samay = Date.parse(samapt) - Date.now();

        setMinute(Math.floor((samay / 1000 / 60) % 60));
        setSecond(Math.floor((samay / 1000) % 60));

        if(samay<0){
            showResultWindow();
        }
    }

    const interval = useRef()
    
    useEffect(()=>{
        const samapt = deadline;
        interval.current = setInterval(() => getTimeLeft(samapt), 1000);
        return () => clearInterval(interval.current)
    }, [deadline]);

    const navigate = useNavigate()

    const showResultWindow = () => {
        axios.post('https://parikshaserver.onrender.com/confirmation', {quizInfo, email})
            .then(result => {
                if(result.data=="mail sent"){
                    console.log("mail sent");
                }
                navigate(`../User/resultWindow/${email}/${quizInfo}`)
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
                                <Link class="nav-link" data-bs-toggle="modal" data-bs-target="#instructions" >Instructions</Link>
                            </li>
                            <li class="nav-item">
                                <Link class="nav-link" data-bs-toggle="modal" data-bs-target="#questionPaper" >Question Paper</Link>
                            </li>
                        </ul>
                        <div class="text-left">
                            <div class="row gx-3">
                                <div class="col">
                                    <div class="p-3">
                                        Deadline Time :<span>{moment(deadline).format('Do MMM YYYY, h:mm:ss a')}</span><br/>
                                        Current Time :<span>{moment(Date.now()).format('Do MMM YYYY, h:mm:ss a')}</span>
                                    </div>
                                </div>
                                <div class="col">
                                    <div class="p-3">
                                    <h6>Time Left = <span style={{ color: "red" }} > {minute < 0 ? "Time" : minute} : {second < 0 ? "Over" : second} </span></h6>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
            <br />
            
            <div class="modal-dialog modal-dialog-scrollable">
                <div class="modal fade" id="questionPaper" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h1 class="modal-title fs-5" id="exampleModalLabel">Question Paper</h1>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                {values == null ? "" : values.map((value) => {
                                    return (
                                        <>
                                            <h6>{value.question}</h6>
                                            <span>{value.opt1 + ", "}</span>
                                            <span>{" " + value.opt2 + ", "}</span>
                                            <span>{" " + value.opt3 + ", "}</span>
                                            <span>{" " + value.opt4}</span><br /><br />
                                        </>
                                    )
                                })
                                }
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="modal-dialog modal-dialog-scrollable">
                <div class="modal fade" id="instructions" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h1 class="modal-title fs-5" id="exampleModalLabel">Marking Scheme</h1>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body" style={{ textAlign: "left" }}>
                                <p>1. You are allowed to login within an stipulated time. Duration of login is within 15 minutes of scheduled time.<br /><br />If the scheduled time is 7:00 pm, then you are allowed to login from 7:00 pm to 7:15pm .</p>
                                <p>2. After selecting the options Click on the Save responses otherwise the answer can't be saved.</p>
                                <p>3. For each correct answer, you are awarded +4 marks while -1 is deducted for each incorrect response.</p>
                                <p>4. There is no marks for unattempted questions.</p>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="container px-4 text-center">
                <div class="row gx-3">
                    <div class="col" >
                        <div class="shadow-lg p-3 mb-5 bg-body-tertiary rounded">
                            <div className="questions">
                                <h4>{values[currentQuestion] == null ? "" : (currentQuestion + 1) + '.  ' + values[currentQuestion].question}</h4>
                            </div>
                            <br />
                            A. <button type="submit" onClick={() => setClickedOption("Option A")} className={` ${clickedOption !== 'Option A' ? "btn btn-outline-primary" : "btn btn-success"} `} >{values[currentQuestion] == null ? "" : values[currentQuestion].opt1}</button><br /><br />
                            B. <button type="submit" onClick={() => setClickedOption("Option B")} className={` ${clickedOption !== 'Option B' ? "btn btn-outline-primary" : "btn btn-success"} `} >{values[currentQuestion] == null ? "" : values[currentQuestion].opt2}</button><br /><br />
                            C. <button type="submit" onClick={() => setClickedOption("Option C")} className={` ${clickedOption !== 'Option C' ? "btn btn-outline-primary" : "btn btn-success"} `} >{values[currentQuestion] == null ? "" : values[currentQuestion].opt3}</button><br /><br />
                            D. <button type="submit" onClick={() => setClickedOption("Option D")} className={` ${clickedOption !== 'Option D' ? "btn btn-outline-primary" : "btn btn-success"} `} >{values[currentQuestion] == null ? "" : values[currentQuestion].opt4}</button><br /><br />
                            <span>Selected Option : {filterSort[0] == null ? "" : filterSort[0].choosen}</span>
                        </div>
                    </div>
                    <nav aria-label="Page navigation example" >
                        <ul class="pagination justify-content-center">
                            <li class="page-item"><button class="page-link" onClick={previousQuestion}>Previous</button></li>
                            <li class="page-item"><button class="page-link" onClick={saveQuestion}>Save Response</button></li>
                            <li class="page-item"><button class="page-link" onClick={clearResponses}>Clear Response</button></li>
                            <li class="page-item"><button class="page-link" onClick={nextQuestion}>Next</button></li>
                        </ul>
                    </nav>
                </div>

                <button type="button" class="btn btn-outline-danger" data-bs-toggle="modal" data-bs-target="#exampleModal">
                    Submit Test
                </button>

                <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h2 class="modal-title fs-5" id="exampleModalLabel">Confirmation</h2>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                Are you sure want to submit the test ?
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">Close</button>
                                <button type="button" class="btn btn-outline-primary" data-bs-dismiss="modal" onClick={() => showResultWindow()} >Submit Test</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <br />

            <div class="footer">
                <br />
                <p>&copy; 2024 Designed, Developed and Hosted by National Informatics Center.</p>
                <br />
            </div>
            <ToastContainer/>
        </div>
    )
}

export default QuizWindow;
