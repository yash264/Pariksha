import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import { ToastContainer,toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";

function Upload() {

    const [file, setFile] = useState([]);
    const [title, setTitle] = useState([]);
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

    const deletePdf = (pdf) => {
        axios.post('https://parikshaserver.onrender.com/deletePdf', {pdf})
        .then(result=>{
            if(result.data === "deleted Pdf"){
                toast.success("Deleted Successfully");
                getPdf();
            }
        })
        .catch(error=>{
            console.log(error);
        })
    }

    const submitPdf = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("title", title);
        formData.append("file", file);
        const result = await axios.post('https://parikshaserver.onrender.com/uploadPdf', formData, { headers: { "Content-Type": "multipart/form-data" } });
        
        if(result.data === "uploaded Pdf" ){
            toast.success("Uploaded Successfully");
            getPdf();
        }
    }

    const filterSort = pdf== null ? "" : pdf.filter(data =>  data.type === "pdf" )
    .sort((a,b) => a.date < b.date ? 1 : -1)

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
                <form onSubmit={submitPdf} >
                    <div class="col-md-9">
                        <label for="email" class="form-label">Title of the Pdf</label>
                        <input type="text" class="form-control" onChange={(e) => setTitle(e.target.value)} placeholder="Enter a beautiful title of Pdf" />
                    </div>
                    <br/>
                    <div class="col-mb-3">
                        <input type="file" class="form-control" onChange={(e) => setFile(e.target.files[0])} accept="application/pdf" />
                    </div>
                    <button type="submit" class="btn btn-outline-primary">Upload</button>
                </form>
                <ToastContainer />
            </div>
            <br />


            <table class="table">
                <thead>
                    <tr>
                        <th scope="col">S.No</th>
                        <th scope="col">Title of the Pdf</th>
                        <th scope="col">Date/Time of Upload</th>
                        <th scope="col">Show File</th>
                        <th scope="col">Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        pdf === null ? "" : filterSort.map((data) => {
                            return <tr>
                                <td>*</td>
                                <td>{data.title}</td>
                                <td>{moment(data.date).format('Do MMM YYYY, h:mm:ss a')}</td>
                                <td><button className="btn btn-outline-success" onClick={() => showPdf(data.pdf)}>Click here</button></td>
                                <td><button className="btn btn-outline-danger" onClick={() => deletePdf(data.pdf)}>Click here</button></td>
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

export default Upload;
