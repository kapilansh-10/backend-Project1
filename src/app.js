import express from "express" // import express
import cors from "cors" // import cors
import cookieParser from "cookie-parser"

const app = express() // create express app

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json({limit: "16kb"})) // for parsing application/json
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))
app.use(cookieParser())

// routes import
import userRouter from './routes/user.routes.js' // import userRoutes from user.routes.js file 


// routes declaration

app.use("/api/v1/users", userRouter) // use userRoutes for /users endpoint

// http://localhost:8000/api/v1/users/register

export { app }  