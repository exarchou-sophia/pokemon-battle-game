import { Router } from "express"
import { validateRoster } from "../middlewares/validate-roster.js"

export const rosterRouter = Router()

let rostersCollection = [
    {
        id: 0,
        ownerId: 1,
        pokemonIds: [25, 6, 1, 150, 143, 18],
    },
    {
        id: 1,
        ownerId: 2,
        pokemonIds: [7, 8, 9, 26, 45, 78],
    },
    {
        id: 2,
        ownerId: 3,
        pokemonIds: [39, 40, 41, 42, 43, 44],
    },
    {
        id: 3,
        ownerId: 4,
        pokemonIds: [10, 11, 12, 13, 14, 15],
    },
    {
        id: 4,
        ownerId: 5,
        pokemonIds: [100, 101, 102, 103, 104, 105],
    },
    {
        id: 5,
        ownerId: 6,
        pokemonIds: [200, 201, 202, 203, 204, 205],
    },
]

rosterRouter.get("/", (req, res) => {
    return res.status(200).json(rostersCollection)
})

rosterRouter.get("/:id", (req, res) => {
    console.log("get roster by id", req.params.id)

    const rs = rostersCollection.find(
        (roster) => roster.id === req.params.id * 1,
    )
    if (rs) return res.status(200).json(rs)
    else return res.status(404).json()
})

rosterRouter.post("/", validateRoster, (req, res) => {
    const { ownerId } = req.body
    console.log("ownerId", ownerId)
    // ????????
    return res.status(201).json()
})
