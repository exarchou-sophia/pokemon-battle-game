import { Router } from "express"
import { validateUser } from "../middlewares/validate-user.js"
import { validateUpdateFavPokemon } from "../middlewares/validate-update-fav-pokemon.js"
import { User } from "../models/user.js"
import { deleteUserById, getUsers } from "../controllers/user-controller.js"

export const userRouter = Router()

userRouter.get("/", getUsers)
userRouter.get("/:id", deleteUserById)

userRouter.delete("/:id", async (req, res) => {
    try {
        const result = await User.deleteOne({ _id: req.params.id }).exec()

        if (result.deletedCount === 0) {
            return res.status(404).json({ message: "User not found" })
        }

        return res.status(200).json()
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

userRouter.put(
    "/:id/add-fav-pokemon",
    validateUpdateFavPokemon,
    async (req, res) => {
        const userId = req.params.id
        const { pokemonId } = req.body
        try {
            const updatedUser = await User.findByIdAndUpdate(
                userId,
                { $addToSet: { favPokemonIds: pokemonId } },
                { new: true },
            )
            res.status(200).json(updatedUser)
        } catch (error) {
            res.status(500).json({
                error: "Failed to add Pokémon to favorites",
            })
        }
    },
)

userRouter.put(
    "/:id/remove-fav-pokemon",
    validateUpdateFavPokemon,
    async (req, res) => {
        const userId = req.params.id
        const { pokemonId } = req.body
        try {
            const updatedUser = await User.findByIdAndUpdate(
                userId,
                { $pull: { favPokemonIds: pokemonId } },
                { new: true },
            )
            res.status(200).json(updatedUser)
        } catch (error) {
            res.status(500).json({
                error: "Failed to remove Pokémon from favorites",
            })
        }
    },
)
