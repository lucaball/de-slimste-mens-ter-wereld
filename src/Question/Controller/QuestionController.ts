import {Body, Controller, Inject, Param, Post, Put} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {GameRound} from "../../Models/GameRound";
import {Repository} from "typeorm";
import {QuestionFactory} from "../Factory/QuestionFactory";
import {Question} from "../../Models/Question";

@Controller()
export class QuestionController {

    constructor(
        @InjectRepository(GameRound)
        private gameRoundRepository: Repository<GameRound>,
        @InjectRepository(Question)
        private questionRepository : Repository<Question>,
        private questionFactory: QuestionFactory
    ) {
    }

    @Post("/question/new")
    async createNewForRound(
        @Body() createQuestionBody: any
    ) {

        const gameRound = await this.gameRoundRepository.findOne({id: createQuestionBody.round})
        return {
            question: await this.questionFactory.createForRound(gameRound)
        }
    }

    @Put('/question/:id')
    async updateQuestion(
        @Body() updateQuestionBody : any,
        @Param() queryParams : any
    ){
        const question : Question = await this.questionRepository.findOne({ id: queryParams.id})

        console.log(updateQuestionBody);
        question.value = updateQuestionBody.value;
        question.type = updateQuestionBody.type;

        return {
            question : await this.questionRepository.save([question])
        };
    }

}