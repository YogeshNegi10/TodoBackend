import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import taskRouter from './routes/taskRoute.js';
import userRouter from './routes/userRoute.js';
import { ErrorMsge } from './utils/error.js';
import connectDb from './DB/dataBase.js';


//Using dotenv to access Environmental varialbles
dotenv.config();

const app = express();

//Connecting To Database
connectDb();


// Using all Middlewares here
app.use(express.json());
app.use(cookieParser())
app.use(cors({
     origin:[process.env.FRONTED_URL],
     methods:['GET','POST','PUT','DELETE'],
     credentials:true
}))
app.use("/api/v1/user",userRouter);
app.use("/api/v1/task",taskRouter);

// Usinging ErrorMiddleware
app.use(ErrorMsge)


app.listen(process.env.PORT,()=>{
   try {
        console.log(`Server is Listening on Port : ${process.env.PORT}`)
   } catch (error) {
        console.log("An Error occured",error)
   }
})