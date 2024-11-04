import { Router } from "express"
import { validateUser } from "../middlewares/validate-user.js"

export const userRouter = Router()

userRouter.get("/", (req, res) => {
    return res.status(200).json([
        {
            id: 0,
            firstName: "Sonia",
            lastName: "Vecchia",
            country: "Italy",
            username: "Sunshine62",
        },
    ])
})

userRouter.get("/:id", (req, res) => {
    console.log("get user by id", req.params.id)

    return res.status(200).json({
        id: 0,
        firstName: "Sonia",
        lastName: "Vecchia",
        country: "Italy",
        username: "Sunshine62",
    })
})

userRouter.post("/", validateUser, (req, res) => {
    const { firstName } = req.body
    console.log("firstName", firstName)

    return res.status(201).json()
})
