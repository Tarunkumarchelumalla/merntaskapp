
import bodyParser from "body-parser";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import postRoutes from "./routes/Post.js";

const app =express();
app.use(express.json());
app.use(bodyParser.json({limit:"30mb",extended:true}));
app.use(bodyParser.urlencoded({limit:"30mb",extended:true}));
app.use(cors());
app.use('/posts',postRoutes);
const CONNECTION_URL ="mongodb+srv://task123:task123@task.7cgsi7r.mongodb.net/test?retryWrites=true&w=majority";
const PORT =process.env.PORT||5000;

mongoose.connect(CONNECTION_URL,{useNewUrlParser:true,useUnifiedTopology:true})
.then(()=>app.listen(PORT ,()=>console.log(`server running on prt :${PORT}`)))
.catch((error)=>console.log(error.message));
