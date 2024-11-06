import { Router } from "express"
import { validateUser } from "../middlewares/validate-user.js"
import { validateUpdateFavPokemon } from "../middlewares/validate-update-fav-pokemon.js"
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
