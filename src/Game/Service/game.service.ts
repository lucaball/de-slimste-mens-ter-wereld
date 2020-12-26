import {Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Game} from "../../Models/Game";
import {Repository} from "typeorm";

@Injectable()
export class GameService {

    constructor(@InjectRepository(Game) private gameRepository: Repository<Game>) {
    }

    async getOneWithRounds(gameId: string): Promise<Game | null> {

        return await this.gameRepository.createQueryBuilder("game")
            .leftJoinAndSelect("game.rounds", "rounds",)
            .leftJoinAndSelect("game.gamePlayers", "gamePlayers",)
            .where("game.id = :gameid", {gameid: gameId})
            .orderBy('rounds.position', 'ASC')
            .getOne();
    }
}
