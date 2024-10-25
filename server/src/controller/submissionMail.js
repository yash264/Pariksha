const nodemailer = require("nodemailer");
  
const submissionMail = async (email,quizName)=>{
    try{
        const transport = nodemailer.createTransport({
            service: "gmail",
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
                user: "yp5094280@gmail.com",
                pass: "nokoctntwjppagot",    //   noko ctnt wjpp agot
            },
        });
        
        const mailOptions = {
            from:{
                name: "Pariksha",
                address: "yp5094280@gmail.com"
            },
            to:email,
            subject: "Regarding response submission ", 
            html:
                ` 
                    <html>
                        <div>
                            <img src="cid:logo" width="140px"/>
                        </div>
                            <h3>Welcome to Pariksha !! </h3>
                            <p> Dear Candidate </p>
                            <br>
                            <p>Thank you for participating in the quiz!! . Your response for the ${quizName} is submitted successfully. If you have any questions or need help getting started, feel free to reach out.</p>
                            <br>
                            <p>We look forward to helping you get the most out of our services!</p>
                            <p>Best regards,</p>
                            <br>
                        <div>
                            <p>&copy; 2024 Designed, Developed and Hosted by National Informatics Center.</p>
                        </div>
                    </html>
                `,
            attachments: [{
                filename: "pariksha.jpg",
                path: "./src/pariksha.jpg",
                cid: "logo"
            }],
        };
        transport.sendMail(mailOptions,(error,success)=>{
            if(error){
                console.log(error);
            }else{
                console.log("Email sent");
            }
        })
    }
    catch(error){
        console.log(error);
    }  
}

module.exports = {submissionMail};