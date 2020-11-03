"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Game = void 0;
const typeorm_1 = require("typeorm");
const BaseResource_1 = require("./BaseResource");
const class_transformer_1 = require("class-transformer");
const scramble_1 = require("../Functions/scramble");
let Game = class Game extends BaseResource_1.BaseResource {
    constructor(partial = null) {
        super();
        this.data = "FREAKING HELL";
        this.joinCode = "#" + scramble_1.randomString(5);
        Object.assign(this, partial);
    }
    scrambled() { return scramble_1.scramble(this.data); }
    ;
};
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], Game.prototype, "name", void 0);
__decorate([
    typeorm_1.Column({ unique: true, nullable: false }),
    class_transformer_1.Exclude(),
    __metadata("design:type", String)
], Game.prototype, "joinCode", void 0);
__decorate([
    class_transformer_1.Expose({ groups: ['answered'] }),
    __metadata("design:type", String)
], Game.prototype, "data", void 0);
__decorate([
    class_transformer_1.Expose({ groups: ['unanswered'] }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", String)
], Game.prototype, "scrambled", null);
Game = __decorate([
    typeorm_1.Entity(),
    __metadata("design:paramtypes", [Object])
], Game);
exports.Game = Game;
//# sourceMappingURL=Game.js.map