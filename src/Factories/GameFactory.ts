import * as Faker from "faker"
import {define, factory} from "typeorm-seeding"
import {Game} from "../Models/Game";
import {GameRound} from "../Models/GameRound";

define(Game, (faker: typeof Faker) => {

    const game = new Game();
    game.name = faker.lorem.words(4);

    return game;
})

define(GameRound, (faker: typeof Faker, context: { name: string, game: Game }) => {

    return new GameRound(context.name, context.game, []);
})