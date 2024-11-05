import { model, Schema } from "mongoose"

const leaderBoard = new Schema({
    userName: { type: String, require: true },
    country: { type: String, require: false },
    score: { type: Number, require: true },
    createdAt: {
        type: Date,
        default: () => Date.now(),
        immutable: true,
    },
})

export const LeaderBoard = model("LeaderBoard", leaderBoard)
