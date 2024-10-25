import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { ImLinkedin, ImEnvelop } from "react-icons/im";
import { DiGithubBadge } from "react-icons/di";
import { FaInstagram } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";

function About() {
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
                <div class="row gx-5 ">
                    <div class="col ">
                        <div class="shadow p-3 mb-5 bg-body-tertiary rounded">
                            <h3>Yash Pandey</h3>
                            <p><ImEnvelop /> yash.20222068@mnnit.ac.in</p>
                            <br />
                            <div class="container px-4 text-center">
                                <div class="row gx-5 p-3 mb-2 bg-success-subtle text-dark">
                                    <div class="col">
                                        <div style={{ textAlign: "left" }}>
                                            <h5>Social Media</h5>
                                            <a href="https://www.linkedin.com/in/yashpandey02/" style={{textDecoration:"none",color:"black"}} ><ImLinkedin /> Yash Pandey </a>
                                            <br/><br/>
                                            <a href="https://github.com/yash264" style={{textDecoration:"none",color:"black"}}><DiGithubBadge />Yash264</a>
                                            <br/><br/>
                                            <a href="https://www.instagram.com/yash_2k19_/" style={{textDecoration:"none",color:"black"}} ><FaInstagram /> yash_2k19_</a>
                                        </div>
                                    </div>
                                    <div class="col">
                                        <div class="p-3">
                                            <p style={{ textAlign: "left" }}>Hello EveryOne, Myself Yash Pandey pursuing Bachelor's of Technology. Currently, I am a pre-final year here at the National Institute of Technology Allahabad.</p>
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

export default About;