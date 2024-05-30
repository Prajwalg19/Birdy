import mongoose from "mongoose"
import dotenv from "dotenv"
import express from "express"
import cors from "cors"
import bodyParser from "body-parser"
import authRoutes from "./routes/authRoutes.js"
import userRoutes from "./routes/userRoutes.js"
import postsRoutes from "./routes/postsRoutes.js"
import multer from "multer"
import {fileURLToPath} from "url"
import path from "path"
import morgan from "morgan"
import helmet from "helmet"
import {register} from "./controllers/authController.js"
import cookieParser from "cookie-parser"
import verifyToken from "./utils/verify.js"
import {createPost} from "./controllers/postController.js"
dotenv.config();


//configurations

const filename = fileURLToPath(import.meta.url) // import.meta.url will return the path to the current module which is  file:///home/dev/socialMedia/server/index.js
// fileURLToPath will convert that to /home/dev/socialMedia/server/index.js
const dirName = path.dirname(filename) // the dirname will convert the full path of file to only the directory that it resides in like this
// /home/dev/socialMedia/server/
const app = express();
app.use(express.json())
const corsOptions = {
    origin: "http://localhost:5173",
    credentials: true,// for accepting the cookie sent by client

}
app.use(cors(corsOptions));

app.use(helmet()) // this library adds header to the response that is more secure than response without it
app.use(helmet.crossOriginResourcePolicy({policy: "cross-origin"}));
app.use(morgan("dev"))  // to log out all the functionings happening in the backend. Defaulted in django but gotta use a library to just log out this GET / 304 0.396 ms - - in nodejs
app.use(bodyParser.json({limit: "30mb", extended: true}));
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}));
app.use(cookieParser())

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/assets");
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
});
const upload = multer({storage});
// uploads an image to the local storage and then moves on to the next middleware for registration
app.use("/auth/register", upload.single("photoPath"), register)
app.use("/post/createPost", upload.single("postImage"), createPost)


// database connection

mongoose.connect(process.env.MONGO_CON_STRING).then(() => {
    console.log("Database connection established")
}).catch(() => {
    console.log("Failed to connect to mongo cluster")
})



// express server

const port = process.env.PORT_NUMBER || 4500
app.listen(port, () => {
    console.log("Server started on port", port)
})


// routes and their respective middleware functions
app.use("/assets/", verifyToken, express.static(path.join(dirName, "public/assets"))) // requesting the file from my computer storage ni the form of axios.get('localhost:4000/assets/someimageName.png')

app.use("/auth/", authRoutes)
app.use("/user/", userRoutes)
app.use("/posts", postsRoutes)




// error handler

app.use((err, req, res, next) => {
    const message = err?.message || "Internal server error"
    const statusCode = err?.statusCode || 500
    res.status(statusCode).json(message)
})
