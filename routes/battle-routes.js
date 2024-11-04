import { Router } from "express"

export const battleRouter = Router()

battleRouter.get("/", (req, res) => {
    // TODO get all battles
    return res.status(200).json([
        {
            id: 0,
            startedAt: new Date(),
            playerRed: {
                playerId: 0,
                rosterId: 5,
                score: 0,
            },
            playerBlue: {
                playerId: 1,
                rosterId: 4,
                score: 0,
            },
        },
    ])
})

battleRouter.get("/:id", (req, res) => {
    console.log("get roster by id", req.params.id)

    return res.status(200).json({
        id: 0,
        startedAt: new Date(),
        playerRed: {
            playerId: 0,
            rosterId: 5,
            score: 0,
        },
        playerBlue: {
            playerId: 1,
            rosterId: 4,
            score: 0,
        },
    })
})

// start battle by creating it (post)
// result gives battle back including who win and their scoring
battleRouter.post("/", (req, res) => {
    // TODO here place logic to calculate the winner
    const postExample = {
        playerRed: {
            playerId: 0,
            rosterId: 5,
        },
        playerBlue: {
            playerId: 1,
            rosterId: 4,
        },
    }

    // read rosters
    const pokemonFromPlayerRed = [1, 2, 3, 4, 5, 6]
    const pokemonFromPlayerBlue = [2, 33, 4, 44, 55, 56]

    let scorePlayerRed = 0
    let scorePlayerBlue = 0
    // get stats from pokemon and compare with pokemon form other player
    for (
        let pokemonIndex = 0;
        pokemonIndex < pokemonFromPlayerRed.length;
        pokemonIndex++
    ) {
        const pokemonIdPlayerRed = pokemonFromPlayerRed[pokemonIndex]
        const pokemonIdPlayerBlue = pokemonFromPlayerBlue[pokemonIndex]

        // fetch from pokemon api get health points and compare  https://pokeapi.co/api/v2/pokemon/ (fetches 20 pokemons per page by default
        //- this includes a url which I need to use in a second request in order to fetch the hp for a specific pokemon)
        const pokemonHealthPlayerRed = 10
        const pokemonHealthPlayerBlue = 100

        if (pokemonFromPlayerRed > pokemonFromPlayerBlue) {
            scorePlayerRed += 100
            scorePlayerBlue -= 25
        } else {
            scorePlayerRed -= 25
            scorePlayerBlue += 100
        }
    }

    return res.status(200).json({
        id: 0,
        startedAt: new Date(),
        playerRed: {
            playerId: 0,
            rosterId: 5,
            score: scorePlayerRed,
        },
        playerBlue: {
            playerId: 1,
            rosterId: 4,
            score: scorePlayerBlue,
        },
    })
})
