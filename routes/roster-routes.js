import { Router } from "express"
import { validateRoster } from "../middlewares/validate-roster.js"

export const rosterRouter = Router()

rosterRouter.get("/", (req, res) => {
    return res.status(200).json([
        {
            id: 0,
            ownerId: 0,
            pokemonIds: [35],
        },
    ])
})

rosterRouter.post("/", validateRoster, (req, res) => {
    const { ownerId } = req.body
    console.log("ownerId", ownerId)
    return res.status(201).json()
})
