import { Injectable } from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {GameRound} from "../../Models/GameRound";
import {Repository} from "typeorm";

@Injectable()
export class GameRoundService {

    constructor(
        @InjectRepository(GameRound)
        private gameRoundRepository : Repository<GameRound>
    ) {
    }


    async getOneWithQuestions(gameRoundId : string)
    {
        return await this.gameRoundRepository.createQueryBuilder("gameRound")
            .leftJoinAndSelect("gameRound.questions", "questions",)
            .where("gameRound.id = :gameid", {gameid: gameRoundId})
            .orderBy('questions.position', 'ASC')
            .getOne();
    }
}
