import {Column, Entity, ManyToOne, OneToMany} from "typeorm";
import {BaseResource} from "./BaseResource";
import {Exclude} from 'class-transformer';
import {randomString} from "../Functions/scramble";
import {GameRound} from "./GameRound";

@Entity()
export class Game extends BaseResource {

    @Column({nullable: true})
    name: string;

    @Column({unique: true, nullable: false})
    @Exclude()
    joinCode: string;

    @OneToMany(() => Game, game => game.rounds)
    rounds: GameRound[]

    constructor(partial: Partial<Game> | null = null) {
        super();

        this.joinCode = "#" + randomString(5);
        Object.assign(this, partial);
    }
}
