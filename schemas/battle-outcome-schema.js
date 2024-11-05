import Joi from "joi"

export const battleOutcomeSchema = Joi.object({
    playerRed: Joi.object({
        playerId: Joi.string().required(),
        score: Joi.number().required(),
    }).required(),

    playerBlue: Joi.object({
        playerId: Joi.string().required(),
        score: Joi.number().required(),
    }).required(),
})
