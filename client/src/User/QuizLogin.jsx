import React from "react";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";

function QuizLogin() {

    const params = useParams();

    const [values, setValues] = useState([])

    axios.defaults.withCredentials = true;
    const quizInfo = params.quizName;

    useEffect(() => {
        axios.post('https://parikshaserver.onrender.com/particularQuizDetail', { quizInfo })
            .then(result => {
                setValues(result.data.data);
            })
            .catch(error => {
                console.log(error);
            })
    }, [])

    const [email, setEmail] = useState([])
    const [password, setPassword] = useState([])

    const scheduled = moment(values.quizDate).format('Do MMM YYYY, h:mm:ss a');
    const currentTime = moment(Date.now()).format('Do MMM YYYY, h:mm:ss a');
    const maxTime = moment(values.quizDate).add('15', 'minute').format('Do MMM YYYY, h:mm:ss a');

    const ScheduledMoment = moment(scheduled, 'Do MMM YYYY, h:mm:ss a');
    const currentMoment = moment(currentTime, 'Do MMM YYYY, h:mm:ss a');
    const maxMoment = moment(maxTime, 'Do MMM YYYY, h:mm:ss a');

    const handleSubmit = (e) => {
        e.preventDefault()
        if (currentMoment.isBefore(ScheduledMoment)) {
            toast.error("Test is yet not started");
        }
        else if (currentMoment.isAfter(maxMoment)) {
            toast.error("Login time of test is Over");
        }
        else {
        axios.post('https://parikshaserver.onrender.com/quizLogin', { email, password, quizInfo })
            .then(result => {
                if (result.data == 'success'){
                    redirect(email, quizInfo);
                }
                else if (result.data == 'Incorrect Password'){
                    toast.error("Incorrect Password");
                }
                else if(result.data == 'Please Register'){
                    toast.error("Please Register");
                }
            })
            .catch(error => {
                console.log(error);
            })
        }
    }

    const navigate = useNavigate()
    const redirect = (email, quizInfo) => {
        navigate("../User/quizWindow", { state: { email: email, quizName: quizInfo } })
    }

    return (
        <div>
            <div class="header">
                <img src={require("../pariksha.jpg")} />
            </div>
            <hr />
            <h3 style={{ textAlign: "center" }}>{params.id}</h3>

            <div class="container px-1 text-center">
                <div class="row gx-5">
                    <div class="col">
                        <div class="shadow p-3 mb-5 bg-body-tertiary rounded">
                            <table class="table">
                                <tbody>
                                    <tr>
                                        <th scope="row">Name of the Quiz :</th>
                                        <td>{values == null ? "" : values.quizName}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Max Marks :</th>
                                        <td>{values.Query == null ? "" : values.Query.length * 4} marks</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Duration :</th>
                                        <td>{values == null ? "" : values.duration} mins</td>
                                    </tr>
                                    <tr>
                                        <th scope="col">Starting Time :</th>
                                        <td>{values == null ? "" : moment(values.quizDate).format('Do MMM YYYY, h:mm:ss a')}</td>
                                    </tr>
                                    <tr>
                                        <th scope="col">Topics Covered :</th>
                                        <td>{values == null ? "" : values.topics}</td>
                                    </tr>
                                    <tr>
                                        <th scope="col">Instructions :</th>
                                        <td>{values == null ? "" : values.instructions}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div class="col">
                        <div class="p-3">

                            <button type="button" class="btn btn-outline-danger" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                                Check Guidelines
                            </button>

                            <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                                <div class="modal-dialog">
                                    <div class="modal-content">
                                        <div class="modal-header">
                                            <h1 class="modal-title fs-5" id="staticBackdropLabel">Guidelines</h1>
                                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                        </div>
                                        <div class="modal-body" style={{textAlign:"left"}}>
                                                <p>1. You are allowed to login within an stipulated time. Duration of login is within 15 minutes of scheduled time.<br/><br/>If the scheduled time is 7:00 pm, then you are allowed to login from 7:00 pm to 7:15pm .</p>
                                                <p>2. For each correct answer, you are awarded +4 marks while -1 is deducted for each incorrect response.</p>
                                                <p>3. There is no marks for unattempted questions.</p>
                                        </div>
                                        <div class="modal-footer">
                                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <br/><br/>

                            <form onSubmit={handleSubmit}>
                                <div class="form-floating mb-3">
                                    <input type="email" class="form-control" onChange={(e) => setEmail(e.target.value)} placeholder="Enter Email Address" />
                                    <label for="floatingInput">Email address </label>
                                </div>
                                <div class="form-floating">
                                    <input type="password" class="form-control" onChange={(e) => setPassword(e.target.value)} placeholder="Enter Password" />
                                    <label for="floatingPassword">Password </label>
                                </div>
                                <br />
                                <button type="submit" class="btn btn-outline-primary">Start Test</button>
                            </form>
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
            <ToastContainer />
        </div>
    )
}

export default QuizLogin;