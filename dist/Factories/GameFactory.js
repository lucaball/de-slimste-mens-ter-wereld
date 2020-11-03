"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_seeding_1 = require("typeorm-seeding");
const Game_1 = require("../Models/Game");
typeorm_seeding_1.define(Game_1.Game, (faker) => {
    let game = new Game_1.Game();
    game.name = faker.lorem.words(4);
    return game;
});
//# sourceMappingURL=GameFactory.js.map