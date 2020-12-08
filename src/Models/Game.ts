import {Column, Entity, ObjectLiteral, OneToMany} from "typeorm";
import {BaseResource} from "./BaseResource";
import {Exclude} from 'class-transformer';
import {randomString} from "../Functions/scramble";
import {GameRound} from "./GameRound";
import {GamePlayer} from "./GamePlayer";

@Entity()
export class Game extends BaseResource implements ObjectLiteral {

    @Column({nullable: true})
    name: string;

    @Column()
    inProgress: boolean

    @Column({unique: true, nullable: false})
    @Exclude()
    joinCode: string;

    @OneToMany(() => GameRound, gameRound => gameRound.game)
    rounds: GameRound[]

    @OneToMany(() => GamePlayer, gamePlayer => gamePlayer.game)
    gamePlayers: GamePlayer[]

    constructor(partial: Partial<Game> | null = null) {
        super();

        this.inProgress = false;
        this.joinCode = "#" + randomString(5);
        Object.assign(this, partial);
    }
}
