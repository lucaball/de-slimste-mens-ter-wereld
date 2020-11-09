import {Injectable} from "@nestjs/common";
import {Game} from "../../Models/Game";
import {GameRound} from "../../Models/GameRound";
import {Question} from "../../Models/Question";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";

@Injectable()
export class QuestionFactory {

    constructor(
        @InjectRepository(Question)
        private questionRepository : Repository<Question>
    ) {
    }

    async createForRound(gameRound : GameRound): Promise<Question> {

        const question = new Question();
        question.gameRound = gameRound;
        question.type = Question.TEXT_TYPE;
        question.value = ""


        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const lastQuestion : Question = await this.questionRepository.createQueryBuilder("question")
            .limit(1)
            .where('round_id = :roundId', { roundId : gameRound.id})
            .orderBy("position", 'DESC')
            .getOne()
        ;

        let position = 0;
        if(lastQuestion !== undefined){
            position = lastQuestion.position + 1;
        }

        question.position = position;

        await this.questionRepository.insert(question);

        return question;
    }
}