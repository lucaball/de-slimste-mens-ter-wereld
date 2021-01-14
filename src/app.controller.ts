import {ClassSerializerInterceptor, Controller, Get, UseInterceptors} from '@nestjs/common';
import {AppService} from './app.service';
import {InjectRepository} from "@nestjs/typeorm";
import {Game} from "./Models/Game";
import {TransformClassToPlain} from "class-transformer";
import {Repository} from "typeorm";
import {Request} from "@nestjs/common";

@Controller()
export class AppController {

    constructor(
        @InjectRepository(Game)
        private gameRepository: Repository<Game>,
        private readonly appService: AppService
    ) {}

  @Get()
  @UseInterceptors(ClassSerializerInterceptor)
  @TransformClassToPlain({groups: ['unanswered']})
  async getHello(@Request() request: Request) {

      const games = await this.gameRepository
          .createQueryBuilder("author")
          .innerJoinAndSelect("author.rounds", "rounds")
          .getMany();

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      request.Inertia.render({
          component: "App",
          props: { games: games }
      });
    }
}
