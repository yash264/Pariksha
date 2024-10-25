import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";

function CreateQuiz() {

    const [values, setValues] = useState([])
    
    const [quizName, setQuizName] = useState([])
    const [duration, setDuration] = useState([])
    const [topics, setTopics] = useState([])
    const [quizDate, setQuizDate] = useState([])
    const [quizTime, setQuizTime] = useState([])
    const [instructions, setInstructions] = useState([])

    axios.defaults.withCredentials = true;
    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post('https://parikshaserver.onrender.com/createQuiz', { quizName, duration, topics, quizDate, quizTime, instructions })
            .then(result => {
                if (result.data.status === "quiz created") {
                    toast.success("Quiz Created Successfully");
                }
                else if (result.data.status === "quizName exists") {
                    toast.error("Try to make the Quiz Name Unique");
                }
            })
            .catch(error => console.log(error))
    }

    const [question, setQuestion] = useState([])
    const [opt1, setOpt1] = useState([])
    const [opt2, setOpt2] = useState([])
    const [opt3, setOpt3] = useState([])
    const [opt4, setOpt4] = useState([])
    const [answer, setAnswer] = useState([])

    const addQuestion = (e) => {
        e.preventDefault()
        axios.post('https://parikshaserver.onrender.com/addQuestion', { quizName, question, opt1, opt2, opt3, opt4, answer })
            .then(result => {
                if (result.data.status === "question added") {
                    toast.success("Question Added");
                    showQuestion();
                }
            })
            .catch(error => console.log(error))
    }

    const showQuestion = async () => {
        const result = await axios.post('https://parikshaserver.onrender.com/showQuestion', { quizName });
        setValues(result.data.data);
    }

    const deleteQuestion = async (questionName) => {
        const result = await axios.post('https://parikshaserver.onrender.com/deleteQuestion', { quizName, questionName });
        if(result.data === "question deleted"){
            toast.success("Question Deleted");
            showQuestion();
        }
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

            <div class="container px-4 text-center">
                <form class="row g-3" onSubmit={handleSubmit}>
                    <div class="col-md-5">
                        <label for="name" class="form-label">Name of the Quiz</label>
                        <input type="text" class="form-control" onChange={(e) => setQuizName(e.target.value)} placeholder="Enter a unique quiz name" />
                    </div>
                    <div class="col-md-5">
                        <label for="name" class="form-label">Duration (mins)</label>
                        <input type="number" class="form-control" onChange={(e) => setDuration(e.target.value)} placeholder="Enter duration" />
                    </div>
                    <div class="col-md-5">
                        <label for="date" class="form-label">Date of Quiz</label>
                        <input type="date" class="form-control" onChange={(e) => setQuizDate(e.target.value)} />
                    </div>
                    <div class="col-md-5">
                        <label for="date" class="form-label">Time of Quiz</label>
                        <input type="time" class="form-control" onChange={(e) => setQuizTime(e.target.value)} />
                    </div>
                    <div class="col-md-5">
                        <label for="topic" class="form-label">Topics Covered</label>
                        <input type="text" class="form-control" onChange={(e) => setTopics(e.target.value)} placeholder="Enter the topics covered" />
                    </div>
                    <div class="col-md-6">
                        <label for="instructions" class="form-label">Instructions</label>
                        <input type="text" class="form-control" onChange={(e) => setInstructions(e.target.value)} placeholder="Enter the insttructions" />
                    </div>
                    <div class="col-12">
                        <button type="submit" class="btn btn-outline-primary">Create Quiz</button>
                    </div>
                </form>
            </div>
            <br />

            <div class="container px-4 text-center">
                <form class="row g-3" onSubmit={addQuestion}>
                    <div class="mb-3">
                        <label for="question" class="form-label">Questions</label>
                        <input type="text" class="form-control" onChange={(e) => setQuestion(e.target.value)} placeholder="Enter your Question" />
                    </div>
                    <div class="row g-3">
                        <div class="col">
                            <input type="text" class="form-control" placeholder="Option 1" onChange={(e) => setOpt1(e.target.value)} />
                        </div>
                        <div class="col">
                            <input type="text" class="form-control" placeholder="Option 2" onChange={(e) => setOpt2(e.target.value)} />
                        </div>
                        <div class="col">
                            <input type="text" class="form-control" placeholder="Option 3" onChange={(e) => setOpt3(e.target.value)} />
                        </div>
                        <div class="col">
                            <input type="text" class="form-control" placeholder="Option 4" onChange={(e) => setOpt4(e.target.value)} />
                        </div>
                    </div>
                    <div class="col-md-4">
                        <label for="correctAnswer" class="form-label" >Correct Answer</label>
                        <select class="form-select" name="option" onChange={(e) => setAnswer(e.target.value)}>
                            <option selected >Choose...</option>
                            <option onChange={(e) => setAnswer(e.target.value)}>Option A</option>
                            <option onChange={(e) => setAnswer(e.target.value)} >Option B</option>
                            <option onChange={(e) => setAnswer(e.target.value)}>Option C</option>
                            <option onChange={(e) => setAnswer(e.target.value)}>Option D</option>
                        </select>
                    </div>
                    <div class="col-md-4">
                        <button type="submit" class="btn btn-outline-primary">Add Question</button>
                    </div>
                </form>
            </div>
            <br/>

            <table class="table">
                <thead>
                    <tr>
                        <th scope="col">Question</th>
                        <th scope="col">Option 1</th>
                        <th scope="col">Option 2</th>
                        <th scope="col">Option 3</th>
                        <th scope="col">Option 4</th>
                        <th scope="col">Answer</th>
                        <th scope="col">Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        values == null ? "" : values.map((data) => {
                            return <tr>
                                <td>{data.question}</td>
                                <td>{data.opt1}</td>
                                <td>{data.opt2}</td>
                                <td>{data.opt3}</td>
                                <td>{data.opt4}</td>
                                <td>{data.answer}</td>
                                <td><button className="btn btn-outline-danger" onClick={()=>deleteQuestion(data.question)} >Click here</button></td>
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
            <ToastContainer />
        </div>
    )
}

export default CreateQuiz;