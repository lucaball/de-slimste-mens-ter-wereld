import {BaseResource} from "./BaseResource";
import {Column, Entity, JoinColumn, ManyToOne, OneToMany} from "typeorm";
import {Game} from "./Game";
import {Question} from "./Question";

@Entity()
export class GameRound extends BaseResource {

    constructor(name, game, position) {
        super();

        this.name = name;
        this.game = game;
        this.position = position;
    }

    @Column({type: "int"})
    position: number;

    @Column()
    name: string;

    @ManyToOne(type => Game, game => game.rounds)
    @JoinColumn({name: 'game_id', referencedColumnName: 'id'})
    game: Game

    @OneToMany(type => Question, question => question.gameRound)
    questions: Question[]
}
