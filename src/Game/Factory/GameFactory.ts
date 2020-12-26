import {Injectable} from "@nestjs/common";
import {Game} from "../../Models/Game";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {GameRound} from "../../Models/GameRound";

@Injectable()
export class GameFactory {

    public static gameRounds = [
        "3-6-9",
        "Puzzel",
        "Open Deur",
        "Gallerij",
        "Collectief geheugen",
        "Finale"
    ]

    constructor(
        @InjectRepository(Game)
        private gameRepository: Repository<Game>,
        @InjectRepository(GameRound)
        private gameRoundRepository: Repository<GameRound>
    ) {
    }

    async createWithRounds(data: { name: string }): Promise<Game> {

        const game = new Game();
        game.name = data.name;

        await this.gameRepository.insert(game);
        this.createRounds(game);

        return game;
    }

    private createRounds(game: Game) {
        let position = 0;
        GameFactory.gameRounds.forEach((roundName) => {
            const gameRound = new GameRound(roundName, game, position);
            this.gameRoundRepository.insert(gameRound)
            position++;
        })
    }
}
