import nextSession from "next-session";
import { wordList } from "./wordList.js";

const getSession = nextSession();

export default async function handler(req, res) {
    const session = await getSession(req, res);
    if (!session.gameState || session.gameState.state === 1 || session.gameState.state === 2) {
        // fresh game
        const randIndex = Math.floor(Math.random() * wordList.length);
        const randWord = wordList[randIndex];
        console.log(randWord);
        session.gameState = {
            word: randWord,
            state: 0, // 0 playing, 1 lose, 2 win
            turnIndex: 0,
            results: [
                {
                    value: '',
                    results: [0, 0, 0, 0, 0]
                },
                {
                    value: '',
                    results: [0, 0, 0, 0, 0]
                },
                {
                    value: '',
                    results: [0, 0, 0, 0, 0]
                },
                {
                    value: '',
                    results: [0, 0, 0, 0, 0]
                },
                {
                    value: '',
                    results: [0, 0, 0, 0, 0]
                }
            ]
        };
    } else {
        session.gameState.turnIndex++;
    }

    const { guess } = req.body;
    if (!guess || guess.length !== 5) {
        res.status(400).json({ error: "Bad request" });
    }

    const results = [0, 0, 0, 0, 0];
    const word = session.gameState.word;
    for (let i = 0; i < guess.length; i++) {
        if (guess[i] && guess[i] && guess[i] === word[i]) {
            // letter is in right place
            results[i] = 1;
        } else {
            if (word.indexOf(guess[i]) !== -1) {
                // letter is in wrong place
                results[i] = 3;
            } else {
                // letter is not in word
                results[i] = 2;
            }
        }
    }

    session.gameState.results[session.gameState.turnIndex].value = guess;
    session.gameState.results[session.gameState.turnIndex].results = results;
    if (guess === word) {
        console.log("winner");
        session.gameState.state = 2;
    } else if (session.gameState.turnIndex >= 4) {
        session.gameState.state = 1;
    }

    const gameStateCopy = {};
    Object.assign(gameStateCopy, session.gameState);
    delete gameStateCopy.word;
    res.status(200).json({ gameState: gameStateCopy });
}
