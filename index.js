import express from "express";
import mongoose from "mongoose";
import doteEnv from 'dotenv';
import cors from 'cors';
import multer from "multer";

import { deleteWork, getWorks, uploadWork, updateWork } from "./methods/works/index.js";
import { adminLogin, adminRegister, adminGetMe } from "./methods/admin/index.js";
import { authCheck } from "./handlers/index.js";
import { sendSecretCode } from "./methods/secretCode/index.js";
import { deleteTechnology, getTechnologies, uploadTechnology } from "./methods/technologies/index.js";
import { getAboutMe, setAboutMe } from "./methods/aboutMe/index.js";

doteEnv.config();

mongoose.set("strictQuery", false);
mongoose.connect(process.env.MONGO_LINK)
        .then(() => console.log('database ok'))
        .catch(e => console.log(e));

const app = express();

const storage = multer.diskStorage({
    destination: (_, __, cb) => {
        cb(null, 'uploads');
    },
    filename: (_, file, cb) => {
        cb(null, file.originalname);
    }

});

const upload = multer({ storage });

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

app.post('/upload', authCheck, upload.array('images'), (req, res) => {
    res.json({
        urls: [req.files.map(file => file.originalname)]
    });
});

app.post('/auth/registration', adminRegister);
app.post('/auth/login', adminLogin);
app.get('/auth/getMe', adminGetMe)

app.get('/aboutMe', getAboutMe);
app.post('/aboutMe', authCheck, setAboutMe);

app.get('/works', getWorks);
app.post('/works', authCheck, uploadWork);
app.patch('/works/:id', authCheck, updateWork);
app.delete('/works/:id', authCheck, deleteWork);

app.get('/technologies', getTechnologies);
app.post('/technologies', authCheck, uploadTechnology);
app.delete('/technologies/:id', authCheck, deleteTechnology);

app.post('/verifyCode', sendSecretCode);

app.listen(4444, (err) => {

    if (err) return console.log(err);
    
    console.log('Server OK');
});
