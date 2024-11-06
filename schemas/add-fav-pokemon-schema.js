import Joi from "joi"

export const addFavPokemonSchema = Joi.object({
    pokemonId: Joi.number().required(),
})
