import {Controller, Get, Request} from '@nestjs/common';
import {AppService} from './app.service';
import {InjectRepository} from "@nestjs/typeorm";
import {Game} from "./Models/Game";
import {Repository} from "typeorm";

@Controller()
export class AppController {

    constructor(
        @InjectRepository(Game)
        private gameRepository: Repository<Game>,
        private readonly appService: AppService
    ) {
    }

    @Get()
    getHello(@Request() request: Request) {

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        request.Inertia.render({
            component: "App"
        });
    }
}
