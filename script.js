        
function clearErrors(){
    errors=document.getElementsByClassName("formError");
    for(let item of errors)
    {
        item.innerHTML="";
    }
};

function setError(id,error){
    element=document.getElementById(id);
    element.getElementsByClassName("formError")[0].innerHTML=error;
};

function validateForm(){
    var returnvalue=true;
    clearErrors();
    var name=document.forms["form"]["name"].value;
    console.log(name);
    if(name.length<5){
        setError("name"," * length of the name is too short");
        returnvalue=false;
    }
    if(name.length>20){
        setError("name"," * length of the name is too long");
        returnvalue=false;
    }
    var email=document.forms["form"]["email"].value;
    console.log(email);
    if(email.charAt(email.length-4)!="."){
        setError("email"," * Email Id entered is not valid");
        returnvalue=false;
    }

    var tel=document.forms["form"]["tel"].value;
    console.log(tel);
    if(tel.length!==10){
        setError("tel"," * Phone number should be of 10 digits");
        returnvalue=false;
    }
    var password=document.forms["form"]["password"].value;
    console.log(password);
    if(password.length<6){
        setError("password"," * Password should be of atleast 6 character");
        returnvalue=false;
    }

    var conform_password=document.forms["form"]["conform_password"].value;
    console.log(conform_password);
    if(conform_password!=password){
        setError("conform_password"," * Password and Conform Password should be same");
        returnvalue=false;
    }
    return returnvalue;
};