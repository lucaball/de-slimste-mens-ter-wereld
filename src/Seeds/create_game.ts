import { Factory, Seeder } from "typeorm-seeding"
import {Game} from "../Models/Game";
import {GameRound} from "../Models/GameRound";
import {Question} from "../Models/Question";

export class Create_Game implements Seeder {
    public async run(factory: Factory): Promise<void> {

        // await factory(Game)()
        //     .map(async (game: Game) => {
        //
        //         await factory(GameRound)({
        //                 game: game,
        //                 name : '3-6-9',
        //                 questions : [await factory(Question)() as any]
        //         }).create()
        //
        //         // const /
        //     // game.rounds.push(await factory(GameRound)({
        //     //     name : '3-6-9',
        //     //     questions : [await factory(Question)() as any]
        //     // }).create());
        //     //
        //     // await factory(GameRound)({name : 'Open deur', questions : []}).create()
        //     // await factory(GameRound)({name : 'Puzzel', questions : []}).create()
        //     // await factory(GameRound)({name : 'Ingelijst', questions : []}).create()
        //     // await factory(GameRound)({name : 'Collectief geheugen', questions : []}).create()
        //     // await factory(GameRound)({name : 'Finale', questions : []}).create()
        //
        //     return game;
        //
        // }).create();

    }
}