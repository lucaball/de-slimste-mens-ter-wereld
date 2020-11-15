import {Body, Controller, Delete, Get, Inject, Param, Post, Put} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {GameRound} from "../../Models/GameRound";
import {Repository} from "typeorm";
import {QuestionFactory} from "../Factory/QuestionFactory";
import {Question} from "../../Models/Question";

@Controller('question')
export class QuestionController {

    constructor(
        @InjectRepository(GameRound)
        private gameRoundRepository: Repository<GameRound>,
        @InjectRepository(Question)
        private questionRepository : Repository<Question>,
        private questionFactory: QuestionFactory
    ) {
    }

    @Post("/new")
    async createNewForRound(
        @Body() createQuestionBody: any
    ) {

        const gameRound = await this.gameRoundRepository.findOne({id: createQuestionBody.round})
        return {
            question: await this.questionFactory.createForRound(gameRound)
        }
    }

    @Get('/:id/answers')
    async getAnswers(
        @Param() params : any
    ){
        const question = await this.questionRepository.createQueryBuilder('question')
            .leftJoinAndSelect('question.answers', 'answers')
            .where("question.id = :questionId", { "questionId" : params.id})
            .getOne();

        return {
            "question" : question
        }
    }

    @Put('/:id')
    async updateQuestion(
        @Body() updateQuestionBody : any,
        @Param() queryParams : any
    ){
        const question : Question = await this.questionRepository.findOne({ id: queryParams.id})
        question.value = updateQuestionBody.value;
        question.type = updateQuestionBody.type;

        return {
            question : await this.questionRepository.save([question])
        };
    }

    @Delete('/:id')
    async deleteQuestion(
        @Param() queryParams : any
    ){
        const question : Question = await this.questionRepository.findOne({ id: queryParams.id})

        if(null === question){
            return false;
        }

        this.questionRepository.remove([question]);

        return true;
    }
}
