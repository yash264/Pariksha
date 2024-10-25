import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";

function Feature() {
    return (
        <div>
            <div class="header">
                <img src={require("./pariksha.jpg")} />
            </div>
            <p style={{ textAlign: "center", backgroundColor: "rgba(140, 207, 223, 0.902)", margin: "0px" }} ><span>PA</span>perless <span>R</span>ecruitment for <span>I</span>ntelligent, <span>K</span>nowledgeable, <span>S</span>killed and <span>H</span>ighly <span>A</span>bled candidates</p>

            <nav class="navbar navbar-expand-lg bg-body-secondary"  >
                <div class="container-fluid">
                    <a class="navbar-brand" href="#">Services</a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                            <li class="nav-item">
                                <Link class="nav-link" to="../">Home</Link>
                            </li>
                            <li class="nav-item">
                                <Link class="nav-link" to="/User/register">User</Link>
                            </li>
                            <li class="nav-item">
                                <Link class="nav-link" to="/Admin/adminLogin">Admin</Link>
                            </li>
                            <li class="nav-item">
                                <Link class="nav-link" to="../feature">Features</Link>
                            </li>
                            <li class="nav-item">
                                <Link class="nav-link" to="../about">About</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <br />

            <div class="container px-4 text-center">
                <div class="row gx-5">
                    <div class="col">
                        <div class="shadow p-3 mb-5 bg-body-tertiary rounded">
                            <h3>Features</h3>
                            <div style={{textAlign:"center"}} class="p-3 mb-2 bg-danger-subtle text-dark" >
                                <p>1. Builds a dynamic web appliation facilating real time quiz creation and submission.</p>
                                <p>2. Designed a visual system which sends an auto-generated Email.</p>
                                <p>3. Developed a platform where Admin can upload a file in pdf format.</p>
                                <p>4. Implement a feature that ensure security and privacy of the user.</p>
                            </div>
                            <br />
                            <div class="container px-4 text-center">
                                <div class="row gx-5 p-3 mb-2 bg-success-subtle text-dark">
                                    <div class="col">
                                        <div style={{ textAlign: "left" }}>
                                            <h5>Admin Corner</h5>
                                            <p>1. Admin can create a time bound quiz by providing specified details.</p>
                                            <p>2. Once a quiz is created, admin can see the number of students participated and the leaderBoard.</p>
                                            <p>3. Admin can upload the study materials in the pdf format.</p>
                                            <p>4. Admin can also see the total registered users for that website.</p>
                                        </div>
                                    </div>
                                    <div class="col">
                                        <div class="p-3">
                                        <div style={{ textAlign: "left" }}>
                                            <h5>Candidates Corner</h5>
                                            <p>1. Students can register as a fresh candidate and then they logged in.</p>
                                            <p>2. After logging in, they can update and delete their profiles.</p>
                                            <p>3. They can attempt the quiz at the stipulated time of 15 minutes after the scheduled time.</p>
                                            <p>4. After participating in quiz, student can saw their scoreCard in the detailed view.</p>
                                        </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="footer">
                <br />
                <p>&copy; 2024 Designed, Developed and Hosted by National Informatics Center.</p>
                <br />
            </div>
        </div>
    )
}

export default Feature;
