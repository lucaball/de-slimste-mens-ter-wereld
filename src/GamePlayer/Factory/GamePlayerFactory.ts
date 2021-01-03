import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {GamePlayer} from "../../Models/GamePlayer";
import {Game} from "../../Models/Game";

@Injectable()
export class GamePlayerFactory {
    constructor(
        @InjectRepository(GamePlayer)
        private gamePLayerRepository : Repository<GamePlayer>
    ) {}

    async createForGame(game: Game){
        const gamePlayer = new GamePlayer();

        gamePlayer.game = game;
        gamePlayer.seconds = 60;

        return await this.gamePLayerRepository.save(gamePlayer);
    }
}
