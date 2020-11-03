import * as Faker from "faker"
import {define} from "typeorm-seeding"
import {Game} from "../Models/Game";

define(Game, (faker: typeof Faker) => {

    let game : Game = new Game();
    game.name = faker.lorem.words(4);

    return game;
})