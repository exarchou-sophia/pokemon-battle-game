import express from "express"
import dotenv from "dotenv"
import bodyParser from "body-parser"

import { userRouter } from "./routes/user-routes.js"

dotenv.config()
const app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.raw())
app.use(bodyParser.json())

app.get("/", (_, res) => {
    res.send("the server is working!")
})

app.use("/api/v1/users", userRouter)

app.listen(process.env.PORT, () => {
    console.log(`the server is running on http://localhost:${process.env.PORT}`)
})
