import express from "express"
import cors from "cors"
import nodemailer from "nodemailer"
import multer from "multer"
import {config} from "dotenv"
config();

const app = express();
app.use(cors());
app.use(express.json());


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "./src/uploads");
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    },
});
const upload = multer({ storage: storage });


const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.USER_EMAIL,
        pass: process.env.PASSWORD_EMAIL,
      }
});

app.post("/sendEmail",upload.array("filesEmail",20),(req,res)=>{
    const information = req.body;
    const informationFiles = req.files;
    let attach = []; 
    informationFiles.forEach(file =>{
        attach.push({filename: file.filename,path: file.path});
    });

    const messageEmail = {
        from: `${(information.name_lastName!=="")?information.name_lastName:"user"} <w1lson4li3s@gmail.com>`,
        to: information.toEmail,
        cc: information.ccEmail,
        bcc: information.ccoEmail,
        subject: information.subjectEmail,
        text: information.writeEmail,
        attachments:attach,
    };

    transporter.sendMail(messageEmail,(err,info)=>{
        if(err)return console.log(err);
        res.json({status:"successfully"});
    });
});



app.listen(process.env.PORT,()=>{
    console.log(`listen in port: ${process.env.PORT}`);
})