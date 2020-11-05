import * as Faker from "faker"
import {define} from "typeorm-seeding"
import {GameRound} from "../Models/GameRound";
import {Question} from "../Models/Question";
import {Game} from "../Models/Game";

// define(GameRound, (faker: typeof Faker, context: { name: string, questions: Question[], game: Game }) => {
//
//     const gameRound = new GameRound();
//
//     gameRound.name = context.name;
//     gameRound.questions = context.questions;
//     gameRound.game = context.game;
//
//     return gameRound;
// })