const express = require("express");
const app = express();
const path = require("path");
const hbs = require("hbs");
const partials = require("express-partials");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const PORT = require("port");
const port = process.env.PORT || 4000;
require("./db/conn");
const StudentData = require("./models/registers");
const { registrationMail } = require("./controller/registrationMail"); 
const { submissionMail } = require("./controller/submissionMail");
const multer = require("multer");
const moment = require("moment");

const views_path = path.join(__dirname,"../templates/views");
const partials_path = path.join(__dirname,"../templates/partials");

const corsOptions ={
    origin: "https://pariksha-rust.vercel.app",
    methods: "GET, POST, PUT, DELETE, PATCH, HEAD",
    credentials: true,
}; 

app.use(cors(corsOptions)); 
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/files",express.static("files"));

app.set("view engine","hbs");
app.set("views",views_path);
hbs.registerPartials(partials_path);

app.get("/",(req,res)=>{
    res.render("index")
});

//  to register student 
app.post("/register",async(req,res)=>{
    try{
        const type = "student";
        const ifExists = await StudentData.findOne({type:type,email:req.body.email});
        if(ifExists){
            res.status(201).json("Email Already Exists");
        }
        else{
            const registerStudent = new StudentData({
                type:type,
                name:req.body.name,
                gender:req.body.gender,
                email:req.body.email,
                password:req.body.password
            })
            const registered = await registerStudent.save();

            // to send mail to a person
            const email = req.body.email;
            const studentName = req.body.name;
            registrationMail(email,studentName);

            res.status(201).json("registered");
        }
    }catch(error){
        res.status(400).send(error);
    }
})

//  to login student
app.post("/login",(req,res)=>{
    const {email,password} = req.body;
    StudentData.findOne({email:email})
    .then(user=>{
        if(user){
            if(user.password==password){
                res.json("success");
            }
            else{
                res.json("Incorrect Password");
            }
        }
        else{
            res.json("Please Register");
        }
    })
    .catch(error=>{
        console.log(error);
    })
})

// to fetch data to user profile
app.post("/dashboardData", async (req,res)=>{
    try{
        const email = req.body.email;
        const userData = await StudentData.findOne({email:email});
        if(userData){
            return res.status(200).json({userData});
        }
    }catch(error){
        console.log(error);
    }
})

// to update the profile
app.post("/update", async (req,res)=>{
    try{
        const email = req.body.email;
        const useremail = await StudentData.findOne({email:email});
        if(useremail){
            const updatedProfile = await StudentData.updateMany({_id:useremail._id},{$set:req.body});
            res.status(201).json("updated");
        }
        else{
            res.json("failed");
        }
    }catch(error){
        console.log(error);
    }
})

//  multer disk storage
const storage = multer.diskStorage({
    destination: function (req,file,cb){
        cb(null,"./files");
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now();
        cb(null,uniqueSuffix+file.originalname);
    }
})

const upload = multer({ storage: storage });
  
//  to upload the pdf file
app.post("/uploadPdf", upload.single("file"), async(req,res)=>{
    const title = req.body.title;
    const filename = req.file.filename;
    const date = moment().format('Do MMM YYYY, h:mm:ss a');
    try{
        const _id = "67014558c79b90ed53ef6ec3";
        const type = "pdf";
        uploadedPdf = await StudentData.updateOne({_id:_id},{$push:{UploadedFiles:{type:type,title:title,pdf:filename,date:date}}});
        res.status(201).json("uploaded Pdf");
    }catch(error){
        console.log(error);
    }
})

//  to delete the pdf file
app.post("/deletePdf", async(req,res)=>{
    try{
        const _id = "67014558c79b90ed53ef6ec3";
        uploadedPdf = await StudentData.updateOne({_id:_id},{$pull:{UploadedFiles:{pdf:req.body.pdf}}});
        res.status(201).json("deleted Pdf");
    }catch(error){
        console.log(error);
    }
})

//  to fetch pdf files
app.get("/getFiles", async(req,res)=>{
    try{
        const _id = "67014558c79b90ed53ef6ec3";
        StudentData.find({_id:_id})
        .then((data)=>{
            res.send({data:data});
        })
    }
    catch(error){
        console.log(error);
    }
})

//  to create a quiz
app.post("/createQuiz",async(req,res)=>{
    try{
        const type = "quizDetails";
        const ifExists = await StudentData.findOne({type:type,quizName:req.body.quizName});
        if(ifExists){
            res.json({status:"quizName exists"});
        }
        else{
            const scheduledTime =req.body.quizDate+'T'+req.body.quizTime+'Z';
            const date = moment(scheduledTime).subtract(330, 'minute').format();
            const createQuiz = new StudentData({
                type:type,
                quizName:req.body.quizName,
                duration:req.body.duration,
                quizDate:date,
                topics:req.body.topics,
                instructions:req.body.instructions
            })
            const quizInfo = await createQuiz.save();
            res.json({status:"quiz created"});
        }
    }
    catch(error){
        console.log(error);
    }
})

//  to delete the quiz 
app.post("/deleteQuiz",async(req,res)=>{
    try{
        const type = "quizDetails";
        const quizName = req.body.quizName;
        const ifExists = await StudentData.findOne({type:type,quizName:quizName});
        if(ifExists){
            remove = await StudentData.deleteOne({_id:ifExists._id});
            res.json("quiz deleted");
        }
    }
    catch(error){
        console.log(error);
    }
})

//  to add the questions 
app.post("/addQuestion",async(req,res)=>{
    try{
        const quizName = req.body.quizName;
        const quizData = await StudentData.findOne({quizName:quizName});
        if(quizData){
            addedQuestion =await StudentData.updateOne({_id:quizData._id},{$push:{Query:{question:req.body.question,opt1:req.body.opt1,opt2:req.body.opt2,opt3:req.body.opt3,opt4:req.body.opt4,answer:req.body.answer}}});
            res.json({status:"question added"});
        }
        else{
            res.json({status:"quizName is inValid"});
        }
    }
    catch(error){
        console.log(error);
    }
})

//  to show the questions 
app.post("/showQuestion",async(req,res)=>{
    try{
        const quizName = req.body.quizName;
        await StudentData.findOne({quizName:quizName})
        .then(values=>{
            res.json({data:values.Query});
        })
        .catch(error=>{
            console.log(error);
        })
    }
    catch(error){
        console.log(error);
    }
})

//  to delete the questions 
app.post("/deleteQuestion",async(req,res)=>{
    try{
        const type = "quizDetails";
        const quizName = req.body.quizName;
        const ifExists = await StudentData.findOne({type:type,quizName:quizName});
        if(ifExists){
            remove = await StudentData.updateOne({_id:ifExists._id},{$pull:{Query:{question:req.body.questionName}}});
            res.json("question deleted");
        }
    }
    catch(error){
        console.log(error);
    }
})

//  to delete student profile
app.post("/delete",async (req,res)=>{
    try{
        const {email,password} = req.body;
        const userProfile = await StudentData.findOne({email:email})
        if(userProfile.password===password){
            const deleteAccount = await StudentData.deleteOne({_id:userProfile._id});
            res.json("deleted");
        }else{
            res.json("Incorrect Password");
        }
    }catch(error){
        console.log(error);
    }
})

// to show total users
app.get("/totalUsers",(req,res)=>{
    const type = "student";
    StudentData.find({type:type})
    .then(values=>{
        res.json(values)
    }).catch(error=>res.json(error))
});

// to display total quizes
app.get("/liveQuiz",(req,res)=>{
    const type = "quizDetails";
    StudentData.find({type:type})
    .then(values=>{
        res.json(values)
    }).catch(error=>res.json(error))
});

// to display a particular quiz
app.post("/particularQuizDetail", async(req,res)=>{
    try{
        const type = "quizDetails";
        const quizInfo = req.body.quizInfo;
        quizInfoDetail = await StudentData.findOne({type:type,quizName:quizInfo})
        .then(values=>{
            res.json({data:values});
        })
        .catch(error=>{
            console.log(error);
        })
    }
    catch(error){
        res.json(error)
    }
});

//  to login a student during quiz
app.post("/quizLogin", async(req,res)=>{
    try{
        const {email,password} = req.body;
        const quizName = req.body.quizInfo;
        const user = await StudentData.findOne({email:email});
        if(user){
            if(user.password==password){
                const type = "studentResponse";
                const studentId = quizName+"-"+email;
                const ifExists = await StudentData.findOne({type:type,quizId:studentId});
                if(ifExists){
                    res.json("success");
                }
                else if(!ifExists){
                    const studentResponse = new StudentData({
                        type:type,
                        quizId:studentId,
                        quizDate:Date.now(),
                    })
                    const response = studentResponse.save();
                    res.json("success");
                }
            }
            else{
                res.json("Incorrect Password");
            }
        }
        else{
            res.json("Please Register");
        }
    }
    catch(error){
        console.log(error);
    }
})

//  to save the answers
app.post("/savedAnswer",async(req,res)=>{
    try{
        const quizName = req.body.quizInfo;
        const email = req.body.email;
        const rightAnswer = req.body.correctAnswer.answer;
        const search = quizName+"-"+email;
        const student = await StudentData.findOne({quizId:search});
        if(student){
            const changeAnswer = await StudentData.findOne({_id:student._id,Responses:{ $elemMatch: { questionId:req.body.currentQuestion}}});
            if(changeAnswer){
                remove = await StudentData.updateOne({_id:student._id},{$pull:{Responses:{questionId:req.body.currentQuestion}}});
                add = await StudentData.updateOne({_id:student._id},{$push:{Responses:{questionId:req.body.currentQuestion,choosen:req.body.clickedOption,rightAnswer:rightAnswer}}});
                res.json({status:"answer changed"});
            }
            else{
                savedAnswer = await StudentData.updateOne({_id:student._id},{$push:{Responses:{questionId:req.body.currentQuestion,choosen:req.body.clickedOption,rightAnswer:rightAnswer}}});
                res.json({status:"answer saved"});
            }
        }
        else{
            res.json({status:"try again"});
        }
    }
    catch(error){
        console.log(error);
    }
})

//  to clear the answers
app.post("/clearAnswer",async(req,res)=>{
    try{
        const quizName = req.body.quizInfo;
        const email = req.body.email;
        const search = quizName+"-"+email;
        const student = await StudentData.findOne({quizId:search});
        if(student){
            clearAnswers = await StudentData.updateMany({_id:student._id},{$pull:{Responses:{questionId:req.body.currentQuestion}}});
            res.json({status:"answer cleared"});
        }
        else{
            res.json({status:"try again"});
        }
    }
    catch(error){
        console.log(error);
    }
})

//  to send the result
app.post("/result",async(req,res)=>{
    try{
        const type = "studentResponse";
        const quizName = req.body.quizInfo;
        const email = req.body.email;
        const search = quizName+"-"+email;
        student = await StudentData.findOne({type:type,quizId:search})
        .then(values=>{
            res.json(values);
        })
        .catch((error)=>{
            console.log(error);
        })
    }
    catch(error){
        console.log(error);
    }
})

//  to send the confirmationMail
app.post("/confirmation",async(req,res)=>{
    try{
        const quizName = req.body.quizInfo;
        const email = req.body.email;
        submissionMail(email, quizName);
        res.json("mail sent");
    }
    catch(error){
        console.log(error);
    }
})

//  to save the score
app.post("/score",async(req,res)=>{
    try{
        const quizName = req.body.quizInfo;
        const email = req.body.email;
        const search = quizName+"-"+email;
        const student = await StudentData.findOne({quizId:search})
        if(student){
            const score = req.body.correct*4 - req.body.wrong*1;
            saveScore = await StudentData.updateMany({_id:student._id},{correct:req.body.correct,wrong:req.body.wrong,score:score});
            res.json({status: "ok"});
        }
    }
    catch(error){
        console.log(error);
    }
})

//  to show the leaderBoard
app.post("/leaderBoard",async(req,res)=>{
    try{
        const quizName = req.body.quizName;
        const type = "studentResponse";
        const from = quizName.length;
        const ifExists = await StudentData.find({type:type,quizId:{$regex:quizName}});
        if(ifExists){
            let leaderBoard = [];
            for(let i=0;i<ifExists.length;i++){
                const emailId = ifExists[i].quizId.slice(from+1,ifExists[i].quizId.length);
                const studentType = "student";
                const board = await StudentData.findOne({type:studentType,email:emailId});
                if(board){
                    leaderBoard.push(board);
                }
            }
            res.json({data:ifExists,message:leaderBoard});
        }
    }
    catch(error){
        console.log(error);
    }
})

//  to show the pastQuiz
app.post("/pastQuizes",async(req,res)=>{
    try{
        const email = req.body.email;
        const type = "studentResponse";
        const from = email.length;
        const ifExists = await StudentData.find({type:type,quizId:{$regex:email}});
        if(ifExists){
            let pastQuizes = [];
            for(let i=0;i<ifExists.length;i++){
                const quizName = ifExists[i].quizId.slice(0,ifExists[i].quizId.length-from-1);
                const quizType = "quizDetails";
                const quizDetail = await StudentData.findOne({type:quizType,quizName:quizName});
                if(quizDetail){
                    pastQuizes.push(quizDetail);
                }
            }
            res.json({data:ifExists,message:pastQuizes});
        }
    }
    catch(error){
        console.log(error);
    }
})

app.listen(port,()=>{
    console.log(`Server is running at ${port}.`)
});
