import { leaderboardSchema } from "../schemas/leaderboard-schema.js"

export const validateLeaderboard = (req, res, next) => {
    const { error } = leaderboardSchema.validate(req.body)
    if (error) return res.status(400).json({ error: error.details[0].message })

    next()
}
