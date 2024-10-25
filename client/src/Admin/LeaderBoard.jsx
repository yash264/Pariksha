import React from "react";
import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";

function LeaderBoard() {

    const params = useParams();
    const quizName = params.quizName;

    const [data, setData] = useState([])
    const [message, setMessage] = useState([])

    axios.defaults.withCredentials = true;
    useEffect(() => {
        axios.post('https://parikshaserver.onrender.com/leaderBoard', { quizName })
            .then(result => {
                setData(result.data.data);
                setMessage(result.data.message);
            })
            .catch(error => {
                console.log(error);
            })
    }, [])

    const merge = [];
    const combine = () => {
        for (let i = 0; i < data.length; i++) {
            merge.push({
                detail: message[i],
                response: data[i]
            });
        }
    }
    combine();

    const filterSort = merge== null ? "" : merge.sort((a,b) => a.response.score < b.response.score ? 1 : -1)

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

            <table class="table">
                <thead>
                    <tr>
                        <th scope="col">Name of the Student</th>
                        <th scope="col">Email Id</th>
                        <th scope="col">Mobile No.</th>
                        <th scope="col">Marks Scored</th>
                        <th scope="col">Positive Score</th>
                    </tr>
                </thead>
                <tbody>
                {
                        filterSort == null ? "" : filterSort.map((value) => {
                            return <tr>
                                <td>{value==null ? "" : value.detail.name}</td>
                                <td>{value==null ? "" :value.detail.email}</td>
                                <td>{value==null ? "" :value.detail.mobile}</td>
                                <td>{value==null ? "" :value.response.score}</td>
                                <td>{value==null ? "" :value.response.correct*4}</td>
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
    );
}

export default LeaderBoard;