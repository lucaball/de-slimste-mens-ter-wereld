import { Injectable } from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Game} from "../../Models/Game";
import {Repository} from "typeorm";

@Injectable()
export class GameService {

    constructor(@InjectRepository(Game) private gameRepository : Repository<Game>) {
    }


    async getOneForId(gameId: string) : Promise<Game | null> {
        return await this.gameRepository.findOneOrFail(gameId);
    }
}
