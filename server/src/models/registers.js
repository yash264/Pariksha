const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
    type:{
        type:String
    },
    name:{
        type:String
    },
    gender:{
        type:String
    },
    password:{
        type:String
    },
    email:{
        type:String
    },
    mobile:{
        type:Number
    },
    qualification:{
        type:String
    },
    dob:{
        type:String
    },
    city:{
        type:String
    },
    state:{
        type:String
    },
    pdf:{
        type:String
    },
    title:{
        type:String
    },
    date:{
        type:String
    },
    UploadedFiles:{
        type:Array,
    },
    quizName:{
        type:String
    },
    duration:{
        type:Number
    },
    topics:{
        type:String
    },
    quizDate:{
        type:Date
    },
    instructions:{
        type:String
    },
    Query:{
        type:Array,
    },
    question:{
        type:String
    },
    opt1:{
        type:String
    },
    opt2:{
        type:String
    },
    opt3:{
        type:String
    },
    opt4:{
        type:String
    },
    answer:{
        type:String
    },
    quizId:{
        type:String
    },
    Responses:{
        type:Array
    },
    questionId:{
        type:String
    },
    choosen:{
        type:String
    },
    rightAnswer:{
        type:String
    },
    correct:{
        type:Number
    },
    wrong:{
        type:Number
    },
    score:{
        type:Number
    }
});

const Register = new mongoose.model("details",studentSchema);

module.exports = Register; 