import {Body, Controller, Param, Post, Put} from '@nestjs/common';
import {Question} from "../../Models/Question";
import {InjectRepository} from "@nestjs/typeorm";
import {Answer} from "../../Models/Answer";
import {Repository} from "typeorm/index";

@Controller('answer')
export class AnswerController {

    constructor(
        @InjectRepository(Question)
        private questionRepository: Repository<Question>,
        @InjectRepository(Answer)
        private answerRepository: Repository<Answer>,
    ) {
    }


    @Post()
    async createForQuestion(@Body() createAnswerBody: any) {
        const questionId = createAnswerBody.questionId;
        const question: Question = await this.questionRepository.findOne({id: questionId})

        const answer = new Answer();
        answer.question = question;

        await this.answerRepository.save([answer]);

        return {
            answer: answer
        };
    }

    @Put('/:id')
    async updateQuestion(
        @Body() updateAnswerBody: any,
        @Param() params : any
    ) {
        const answer = await this.answerRepository.findOne(params.id)
        answer.value = updateAnswerBody.answer.value

        await this.answerRepository.save(answer);
    }
}
