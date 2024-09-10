import {gameStates} from "../enums/gameStates.ts";

export type game = {
    id: string,
    name: string,
    gameState: gameStates,
    charName: string,
    avatarId: string
}