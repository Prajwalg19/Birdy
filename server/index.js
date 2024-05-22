import mongoose from "mongoose"
import dotenv from "dotenv"
import express from "express"
import cors from "cors"
import bodyParser from "body-parser"
import authRoute from "./routes/authRoute.js"
import multer from "multer"
import {fileURLToPath} from "url"
import path from "path"
import morgan from "morgan"
import helmet from "helmet"
dotenv.config();


const filename = fileURLToPath(import.meta.url) // import.meta.url will return the path to the current module which is  file:///home/dev/socialMedia/server/index.js
// fileURLToPath will convert that to /home/dev/socialMedia/server/index.js
const dirName = path.dirname(filename) // the dirname will convert the full path of file to only the directory that it resides in like this
// /home/dev/socialMedia/server/


const app = express();
app.use(express.json())
app.use(cors());
app.use(helmet()) // this library adds header to the response that is more secure than response without it
app.use(helmet.crossOriginResourcePolicy({policy: "cross-origin"}));
app.use(morgan("dev"))  // to log out all the functionings happening in the backend. Defaulted in django but gotta use a library to just log out this GET / 304 0.396 ms - - in nodejs
app.use(bodyParser.json({limit: "30mb", extended: true}));
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}));

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/assets");
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
});

const upload = multer({storage});
mongoose.connect(process.env.MONGO_CON_STRING).then(() => {
    console.log("Database connection established")
}).catch(() => {
    console.log("Failed to connect to mongo cluster")
})

const port = process.env.PORT_NUMBER || 4500
app.listen(port, () => {
    console.log("Server started on port", port)
})

app.use("/", (req, res) => {
    res.send("<h1>Hello world</h1>")
})
app.use("/assests/", express.static(path.join(dirName, "public/assets")))
app.use("/api/auth/", authRoute)





app.use((err, req, res, next) => {
    const message = err?.message || "Internal server error"
    const statusCode = err?.statusCode || 500
    res.status(statusCode).json({status: false, message})
})
