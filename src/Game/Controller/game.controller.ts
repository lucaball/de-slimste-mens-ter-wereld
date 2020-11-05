import {Body, Controller, Get, Param, Post, Query} from '@nestjs/common';
import {GameFactory} from "../Factory/GameFactory";
import {Request} from "@nestjs/common";
import {Game} from "../../Models/Game";
import {GameService} from "../Service/game.service";

@Controller()
export class GameController {

    constructor(private gameFactory: GameFactory, private gameService : GameService) {
    }

    @Post("/create-game")
    async createGame(@Body() createGameBody: any) {

        const game: Game = await this.gameFactory.createWithRounds(createGameBody);

        return {
            "compositeuri": "/game/" + game.id + '/composite'
        }
    }

    @Get('/game/:id/composite')
    async test(
        @Request() request: Request,
        @Param() params
    ) {

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        request.Inertia.render({
            component: "GameComposite",
            props: {
                game : await this.gameService.getOneForId(params.id)
            }
        });
    }
}
