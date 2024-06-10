import express  from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}));

app.use(express.json({limit:"16kb"}));
app.use(express.urlencoded({extended: true,}))
app.use(express.static("public"))
app.use(cookieParser())

//route import
import userRouter from './routes/user.router.js';
import fileRoutes from './routes/fileRoute.js';
import imageRoutes from './routes/imageRoute.js';
import multimageRoute from './routes/multimageRoute.js';
//route decleration
app.use("/api/v1/users",userRouter);
app.use('/api/v1/file', fileRoutes);
app.use('/api/v1/image', imageRoutes);
app.use('/api/v1/multimage', multimageRoute);

export default app;