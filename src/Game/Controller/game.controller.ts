import {Body, Controller, Get, Param, Post, Query} from '@nestjs/common';
import {GameFactory} from "../Factory/GameFactory";
import {Request} from "@nestjs/common";
import {Game} from "../../Models/Game";
import {GameService} from "../Service/game.service";
import {GameRound} from "../../Models/GameRound";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {GameRoundService} from "../../GameRound/Service/game-round.service";

@Controller()
export class GameController {

    constructor(
        @InjectRepository(GameRound)
        private gameRoundRepository : Repository<GameRound>,
        private gameFactory: GameFactory,
        private gameService : GameService,
        private gameRoundService: GameRoundService
    ) {}

    @Post("/create-game")
    async createGame(@Body() createGameBody: any) {

        const game: Game = await this.gameFactory.createWithRounds(createGameBody);

        return {
            "composeuri": await this.getFirstRoundUri(game)
        }
    }

    private async getFirstRoundUri(game: Game) {
        const gameWithRounds: Game = await this.gameService.getOneWithRounds(game.id);
        const firstGameRound : GameRound = gameWithRounds.rounds[0];

        return "/game/" + game.id + '/rounds/' + firstGameRound.id
    }

    @Get('/game/:id/rounds/:roundId')
    async test(
        @Request() request: Request,
        @Param() params
    ) {

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        request.Inertia.render({
            component: "RoundEdit",
            props: {
                game : await this.gameService.getOneWithRounds(params.id),
                round : await this.gameRoundService.getOneWithQuestions(params.roundId)
            }
        });
    }
}
