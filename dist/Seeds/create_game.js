"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Create_Game = void 0;
const Game_1 = require("../Models/Game");
class Create_Game {
    async run(factory) {
        await factory(Game_1.Game)().createMany(15);
    }
}
exports.Create_Game = Create_Game;
//# sourceMappingURL=create_game.js.map