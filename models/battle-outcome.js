import { model, Schema } from "mongoose"

const battleOutcome = new Schema({
    playerRed: {
        playerId: {
            type: String,
            required: true,
        },
        score: {
            type: Number,
            required: true,
        },
    },
    playerBlue: {
        playerId: {
            type: String,
            required: true,
        },
        score: {
            type: Number,
            required: true,
        },
    },
    createdAt: { type: String, required: true },
})

export const BattleOutcome = model("BattleOutcome", battleOutcome)
