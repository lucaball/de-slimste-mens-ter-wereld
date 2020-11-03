import {ClassSerializerInterceptor, Controller, Get, UseInterceptors} from '@nestjs/common';
import { AppService } from './app.service';
import {InjectRepository} from "@nestjs/typeorm";
import {Game} from "./Models/Game";
import {Repository} from "typeorm";
import {TransformClassToPlain} from "class-transformer";

@Controller()
export class AppController {

  constructor(
      @InjectRepository(Game)
      private gameRepository : Repository<Game>,
      private readonly appService: AppService
  ) {}

  @Get()
  @UseInterceptors(ClassSerializerInterceptor)
  @TransformClassToPlain({groups: ['unanswered']})
  getHello() {

    return this.gameRepository.find();
  }
}
