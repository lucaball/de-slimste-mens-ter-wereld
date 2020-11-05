import {Factory, Seeder} from "typeorm-seeding"
import {Game} from "../Models/Game";
import {GameRound} from "../Models/GameRound";
import {Question} from "../Models/Question";

export class CreateGameRound implements Seeder {
    public async run(factory: Factory): Promise<void> {

        const game = await factory(Game)().create();

        await factory(GameRound)({
            name: '3-6-9',
            questions: [],
            game: game
        }).create()

        await factory(GameRound)({
            name: 'Open deur',
            questions: [],
            game: game
        }).create()

        await factory(GameRound)({
            name: 'Puzzel',
            questions: [],
            game: game
        }).create();

        await factory(GameRound)({
            name: 'Ingelijst',
            questions: [],
            game: game
        }).create()

        await factory(GameRound)({
            name: 'Collectief geheugen',
            questions: [],
            game: game
        }).create()

        await factory(GameRound)({
            name: 'Finale',
            questions: [],
            game: game
        }).create()
    }
}