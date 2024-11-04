import Joi from "joi"

export const leaderboardSchema = Joi.object({
    username: Joi.string().max(50).required(),
    country: Joi.string().required(),
    score: Joi.number().integer().min(0).required(),
    dateCreated: Joi.string().required(),
})
