import {BaseResource} from "./BaseResource";
import {Entity, JoinColumn, ManyToOne, OneToMany} from "typeorm";
import {Game} from "./Game";
import {Question} from "./Question";

@Entity()
export class GameRound extends BaseResource{

    @ManyToOne(() => Game, game => game.rounds)
    @JoinColumn({name: 'game_id', referencedColumnName: 'id'})
    game: Game

    @OneToMany(() => Question, question => question.gameRound)
    questions: Question[]
}