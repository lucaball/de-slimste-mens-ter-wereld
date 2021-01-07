import {Body, Controller, Get, Param, Post, Query, Request} from '@nestjs/common';
import {GameFactory} from "../Factory/GameFactory";
import {Game} from "../../Models/Game";
import {GameService} from "../Service/game.service";
import {GameRound} from "../../Models/GameRound";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {GameRoundService} from "../../GameRound/Service/game-round.service";
import {GamePlayerFactory} from "../../GamePlayer/Factory/GamePlayerFactory";
import {EventsGateway} from "../../../dist/events-gateway";

@Controller()
export class GameController {

    constructor(
        @InjectRepository(GameRound)
        private gameRoundRepository: Repository<GameRound>,
        @InjectRepository(Game)
        private gameRepository: Repository<Game>,
        private gameFactory: GameFactory,
        private gameService: GameService,
        private gameRoundService: GameRoundService,
        private gamePlayerFactory: GamePlayerFactory,
        private eventGateway : EventsGateway
    ) {
    }

    @Post("/create-game")
    async createGame(@Body() createGameBody: any) {

        console.log(createGameBody);

        const game: Game = await this.gameFactory.createWithRounds(createGameBody);

        return {
            "composeuri": await this.getFirstRoundUri(game)
        }
    }

    private async getFirstRoundUri(game: Game) {
        const gameWithRounds: Game = await this.gameService.getOneWithRounds(game.id);
        const firstGameRound: GameRound = gameWithRounds.rounds[0];

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
                game: await this.gameService.getOneWithRounds(params.id),
                round: await this.gameRoundService.getOneWithQuestions(params.roundId)
            }
        });
    }

    @Get('/play')
    async getJoinGame(
        @Request() request: Request,
        @Query() query
    ){
        const joinCode = query.j;
        const game = await this.gameService.findForJoinCode(joinCode);
        let isAdmin = false;

        if(query.a === '1'){
            isAdmin = true;
        }

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        request.Inertia.render({
            component: "PlayGame",
            props : {
                player: null,
                game: game,
                isAdmin: isAdmin
            }
        })
    }

    @Post('/play')
    async postJoinGame(
        @Request() request: Request,
        @Body() params
    ) {
        const joinCode = params.joinCode;
        const game = await this.gameService.findForJoinCode(joinCode);
        const gamePlayer = await this.gamePlayerFactory.createForGame(game);

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        request.Inertia.render({
            component: "PlayGame",
            props : {
                player: gamePlayer,
                game: game
            }
        })
    }

    @Get('game/:id/play')
    async adminPlayGame(
        @Request() request: Request,
        @Param() params
    ) {
        const gameId = params.id;

        const game = await this.gameService.getOneWithRounds(gameId)
        game.inProgress = true;

        const activeRound = await this.gameRoundService.getOneWithQuestions(game.rounds[0].id);
        await this.gameRepository.save(game);
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        request.Inertia.render({
            component: "AdminPlayGame",
            props : {
                game: game,
                playingRound : activeRound
            }
        })
    }
}
