import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {BaseResource} from "./BaseResource";
import {Expose} from "class-transformer";
import {scramble} from "../Functions/scramble";
import {Question} from "./Question";

@Entity()
export class Answer extends BaseResource{

    @Expose({ groups: ['answered'] })
    data : string;

    @Expose({ groups: ['unanswered'] })
    scrambled() : string { return scramble(this.data) };

    @ManyToOne(() => Question, question => question.answers)
    @JoinColumn({name: 'question_id', referencedColumnName: 'id' })
    question: Question
}
