import { Router } from "express"
import { BattleOutcome } from "../models/battle-outcome.js"

export const leaderboardRouter = Router()

leaderboardRouter.get("/", async (_, res) => {
    const summary = await BattleOutcome.aggregate([
        {
            $facet: {
                redPlayers: [
                    {
                        $project: {
                            playerId: "$playerRed.playerId",
                            score: "$playerRed.score",
                        },
                    },
                ],
                bluePlayers: [
                    {
                        $project: {
                            playerId: "$playerBlue.playerId",
                            score: "$playerBlue.score",
                        },
                    },
                ],
            },
        },
        {
            $project: {
                allPlayers: { $concatArrays: ["$redPlayers", "$bluePlayers"] },
            },
        },
        { $unwind: "$allPlayers" },
        {
            $group: {
                _id: "$allPlayers.playerId",
                totalScore: { $sum: "$allPlayers.score" },
            },
        },
        {
            $project: {
                _id: 0,
                playerId: "$_id",
                score: "$totalScore",
            },
        },
        { $sort: { score: -1 } },
    ])

    return res.status(200).json(summary)
})
