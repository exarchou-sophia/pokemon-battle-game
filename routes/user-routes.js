import { Router } from "express"
import { validateUser } from "../middlewares/validate-user.js"

export const userRouter = Router()

let usersCollection = [
    {
        id: 0,
        firstName: "Sonia",
        lastName: "Vecchia",
        country: "Italy",
        username: "Sunshine62",
    },
    {
        id: 1,
        firstName: "Maria",
        lastName: "Rossi",
        country: "Italy",
        username: "MiaRossi87",
    },
    {
        id: 2,
        firstName: "Linda",
        lastName: "Schmidt",
        country: "Germany",
        username: "LindieS21",
    },
    {
        id: 3,
        firstName: "Emma",
        lastName: "Brown",
        country: "USA",
        username: "EmmyB99",
    },
    {
        id: 4,
        firstName: "Sophia",
        lastName: "Garcia",
        country: "Spain",
        username: "SophieGar12",
    },
    {
        id: 5,
        firstName: "Olivia",
        lastName: "Martinez",
        country: "Mexico",
        username: "LivMartinez44",
    },
    {
        id: 6,
        firstName: "Hana",
        lastName: "Yamada",
        country: "Japan",
        username: "HanaYam55",
    },
    {
        id: 7,
        firstName: "Ava",
        lastName: "Smith",
        country: "Australia",
        username: "AvaSmitty08",
    },
    {
        id: 8,
        firstName: "Chloe",
        lastName: "Dupont",
        country: "France",
        username: "ChloeD76",
    },
    {
        id: 9,
        firstName: "Nora",
        lastName: "Johansen",
        country: "Norway",
        username: "NoraJHansen33",
    },
]

userRouter.get("/", (req, res) => {
    return res.status(200).json(usersCollection)
})

userRouter.get("/:id", (req, res) => {
    console.log("get user by id", req.params.id)

    const rs = usersCollection.find((user) => user.id === req.params.id * 1)
    if (rs) return res.status(200).json(rs)
    else return res.status(404).json()
})

userRouter.post("/", validateUser, (req, res) => {
    const user = req.body
    console.log("firstName", user.firstName)

    usersCollection.push({
        id: usersCollection.length + 1,
        ...user,
    })
    return res.status(201).json()
})
