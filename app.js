import express from "express"
import dotenv from "dotenv"
import bodyParser from "body-parser"
import { connect } from "mongoose"

import { userRouter } from "./routes/user-routes.js"
import { rosterRouter } from "./routes/roster-routes.js"
import { battleRouter } from "./routes/battle-routes.js"
import { leaderboardRouter } from "./routes/leaderboard-routes.js"

dotenv.config()
const app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.raw())
app.use(bodyParser.json())

app.get("/", (_, res) => {
    res.send("the server is working!")
})

app.use("/api/v1/users", userRouter)
app.use("/api/v1/rosters", rosterRouter)
app.use("/api/v1/battles", battleRouter)
app.use("/api/v1/leaderboards", leaderboardRouter)

try {
    await connect(process.env.DATABASE_CONNECTION_STR)

    app.listen(process.env.PORT, async () => {
        console.log(
            `the server is running on http://localhost:${process.env.PORT}`,
        )
    })
} catch (error) {
    console.log(error)
}
