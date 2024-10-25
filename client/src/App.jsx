import React from "react";
import Home from "./Home";
import About from "./About";
import Feature from "./Feature";
import Register from "./User/Register";
import Login from "./User/Login";
import Dashboard from "./User/Dashboard";
import LiveQuiz from "./User/LiveQuiz";
import PastQuiz from "./User/PastQuiz";
import StudyMaterial from "./User/StudyMaterial";
import Update from "./User/Update";
import QuizLogin from "./User/QuizLogin";
import QuizWindow from "./User/QuizWindow";
import ResultWindow from "./User/ResultWindow";
import Delete from "./User/Delete";
import AdminLogin from "./Admin/AdminLogin";
import CreateQuiz from "./Admin/CreateQuiz";
import QuizDetails from "./Admin/QuizDetails";
import TotalUsers from "./Admin/TotalUsers";
import LeaderBoard from "./Admin/LeaderBoard";
import Upload from "./Admin/Upload";
import { BrowserRouter , Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route> 
        <Route path="/feature" element={<Feature />}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="/User/register" element={<Register />}></Route>
        <Route path="/User/login" element={<Login />}></Route> 
        <Route path="/User/dashboard/:email" element={<Dashboard />}></Route>
        <Route path="/User/liveQuiz/:email" element={<LiveQuiz />}></Route>
        <Route path="/User/pastQuiz/:email" element={<PastQuiz />}></Route>
        <Route path="/User/studyMaterial/:email" element={<StudyMaterial />}></Route>
        <Route path="/User/quizLogin/:quizName" element={<QuizLogin />}></Route>
        <Route path="/User/quizWindow" element={<QuizWindow />}></Route>
        <Route path="/User/resultWindow/:email/:quizInfo" element={<ResultWindow />}></Route>
        <Route path="/User/update/:email" element={<Update />}></Route>
        <Route path="/User/delete/:email" element={<Delete />}></Route>
        <Route path="/Admin/adminLogin" element={<AdminLogin />}></Route>
        <Route path="/Admin/createQuiz" element={<CreateQuiz />}></Route>
        <Route path="/Admin/quizDetails" element={<QuizDetails />}></Route>
        <Route path="/Admin/totalUsers" element={<TotalUsers />}></Route>
        <Route path="/Admin/leaderBoard/:quizName" element={<LeaderBoard />}></Route>
        <Route path="/Admin/upload" element={<Upload />}></Route>
      </Routes> 
    </BrowserRouter>
  );
}

export default App;
