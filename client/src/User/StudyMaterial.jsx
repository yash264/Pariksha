import React from "react";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";

function StudyMaterial(){

    const params = useParams()
    const email = params.email;

    const [pdf, setPdf] = useState(null);
    axios.defaults.withCredentials = true;

    useEffect(() => {
        getPdf();
    }, []);

    const getPdf = async () => {
        const result = await axios.get('https://parikshaserver.onrender.com/getFiles');
        setPdf(result.data.data[0].UploadedFiles);
    };

    const showPdf = (pdf) => {
        window.open(`https://parikshaserver.onrender.com/files/${pdf}`, "_blank", "noreferror");
    }

    const filterSort = pdf == null ? "" : pdf.filter(value =>  value.type === "pdf" )
    .sort((a,b) => a.date < b.date ? 1 : -1)

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
                        <th scope="col">S.No</th>
                        <th scope="col">Title of the Pdf</th>
                        <th scope="col">Date/Time of Upload</th>
                        <th scope="col">Show File</th>
                    </tr>
                </thead>
                <tbody>
                        {
                            pdf === null ? "" : filterSort.map((data) => {
                                return <tr>
                                    <td>*</td>
                                    <td>{data.title}</td>
                                    <td>{moment(data.date).add(330,"minute").format('Do MMM YYYY, h:mm:ss a')}</td>
                                    <td><button className="btn btn-outline-success" onClick={() => showPdf(data.pdf)}>Click here</button></td>
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

export default StudyMaterial;
