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
import profilePicRouters from './routes/profilePicRoute.js';
import imageRouters from './routes/imageRouter.js';
import videoRouters from './routes/videoRouter.js';
import audioRouters from './routes/audioRouter.js';
//route decleration
app.use("/api/v1/users",userRouter);
app.use('/api/v1/file', fileRoutes);
app.use('/api/v1/profile-image', profilePicRouters);
app.use('/api/v1/image', imageRouters);
app.use('/api/v1/video', videoRouters);
app.use('/api/v1/audio', audioRouters);

export default app;