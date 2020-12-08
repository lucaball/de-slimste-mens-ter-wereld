import {BaseResource} from "./BaseResource";
import {Column, Entity, ManyToOne} from "typeorm/index";
import {Game} from "./Game";

@Entity()
export class GamePlayer extends BaseResource {

    @ManyToOne(() => Game, game => game.gamePlayers)
    public game;

    @Column()
    public seconds : number;

    constructor() {
        super();
        this.seconds = 60;
    }
}
