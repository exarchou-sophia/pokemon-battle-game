import { addFavPokemonSchema } from "../schemas/add-fav-pokemon-schema.js"

export const validateAddFavPokemon = (req, res, next) => {
    const { error } = addFavPokemonSchema.validate(req.body)
    if (error) return res.status(400).json({ error: error.details[0].message })

    next()
}
