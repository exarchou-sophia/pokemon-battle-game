import { Router } from "express"
import { validateLeaderboard } from "../middlewares/validate-leaderboard.js"
import { LeaderBoard } from "../models/leader-board.js"

export const leaderboardRouter = Router()

// const leaderboardCollection = [
//     {
//         id: 0,
//         country: "Italy",
//         username: "Sunshine62",
//         score: 1450,
//         dateCreated: "2024-11-01T10:00:00Z",
//     },
//     {
//         id: 1,
//         country: "Italy",
//         username: "MiaRossi87",
//         score: 1520,
//         dateCreated: "2024-11-02T15:30:00Z",
//     },
//     {
//         id: 2,
//         country: "Germany",
//         username: "LindieS21",
//         score: 1380,
//         dateCreated: "2024-11-03T12:45:00Z",
//     },
//     {
//         id: 3,
//         country: "USA",
//         username: "EmmyB99",
//         score: 1600,
//         dateCreated: "2024-11-04T09:20:00Z",
//     },
//     {
//         id: 4,
//         country: "Spain",
//         username: "SophieGar12",
//         score: 1490,
//         dateCreated: "2024-11-01T20:15:00Z",
//     },
//     {
//         id: 5,
//         country: "Mexico",
//         username: "LivMartinez44",
//         score: 1575,
//         dateCreated: "2024-11-02T18:40:00Z",
//     },
// ]

leaderboardRouter.get("/", (req, res) => {
    return res.status(200).json(LeaderBoard)
})

leaderboardRouter.get("/:id", async (req, res) => {
    try {
        const rs = await LeaderBoard.findById(req.params.id).andexec()
        // (user) => user.id === req.params.id * 1,
        if (rs) return res.status(200).json(rs)
        else return res.status(404).json()
    } catch (error) {
        return res
            .status(500)
            .json({ message: "Internal Server Error", error: error.message })
    }
})

leaderboardRouter.post("/", validateLeaderboard, async (req, res) => {
    const leaderboard = req.body
    try {
        const newLeaderboard = new LeaderBoard({
            ...leaderboard,
        })
        return res.status(201).json()
    } catch (error) {
        return res
            .status(500)
            .json({ message: "Internal Server Error", error: error.message })
    }
})
