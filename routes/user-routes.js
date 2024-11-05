import { Router } from "express"
import { validateUser } from "../middlewares/validate-user.js"
import { User } from "../models/user.js"

export const userRouter = Router()

userRouter.get("/", async (req, res) => {
    const users = await User.find({})
    return res.status(200).json(users)
})

userRouter.get("/:id", async (req, res) => {
    try {
        const user = await User.findById(req.params.id).exec()

        if (user) {
            return res.status(200).json(user)
        } else {
            return res.status(404).json({ message: "User not found" })
        }
    } catch (error) {
        return res
            .status(500)
            .json({ message: "Internal Server Error", error: error.message })
    }
})

userRouter.post("/", validateUser, async (req, res) => {
    const user = req.body

    try {
        const newUser = new User({
            ...user,
        })
        await newUser.save()

        return res.status(201).json({ id: newUser._id })
    } catch (error) {
        return res
            .status(500)
            .json({ message: "Internal Server Error", error: error.message })
    }
})
