const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();

app.use(cors({}));

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cookieParser());

// Route imports
const userRouter = require("./routes/user.router.js");
const fileRoutes = require("./routes/fileRoute.js");
const profilePicRouters = require("./routes/profilePicRoute.js");
const imageRouters = require("./routes/imageRouter.js");
const videoRouters = require("./routes/videoRouter.js");
const audioRouters = require("./routes/audioRouter.js");

// Route declarations
app.use("/api/v1/users", userRouter);
app.use("/api/v1/file", fileRoutes);
app.use("/api/v1/profile-image", profilePicRouters);
app.use("/api/v1/image", imageRouters);
app.use("/api/v1/video", videoRouters);
app.use("/api/v1/audio", audioRouters);
module.exports = app;
