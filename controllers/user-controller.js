import { User } from "../models/user.js"

export const getUsers = async (req, res) => {
    const users = await User.find({})
    return res.status(200).json(users)
}

export const deleteUserById = async (req, res) => {
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
}
