import {Column, Entity, JoinColumn, ManyToOne, OneToMany} from "typeorm";
import {BaseResource} from "./BaseResource";
import {Answer} from "./Answer";
import {GameRound} from "./GameRound";

@Entity()
export class Question extends BaseResource {

    @OneToMany(() => Answer, answer => answer.question)
    answers: Answer[]

    @Column()
    type: string

    @Column()
    value: string

    @ManyToOne(() => GameRound, gameRound => gameRound.questions)
    @JoinColumn({name: 'round_id', referencedColumnName: 'id' })
    gameRound: GameRound
}
