import { Injectable } from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Game} from "../../Models/Game";
import {Question} from "../../Models/Question";
import {Repository} from "typeorm/index";

@Injectable()
export class QuestionService {
    constructor(@InjectRepository(Question) private questionRepository: Repository<Question>) {
    }

    async getOneWithAnsers(questionId: string): Promise<Question | null> {

        const question = await this.questionRepository.createQueryBuilder("question")
            .leftJoinAndSelect("question.answers", "answers",)
            .where("question.id = :questionid", {questionid: questionId})
            .getOne();

        question.answers.map((answer) => {
            answer.value = "";
            return answer
        })

        return question;
    }
}
