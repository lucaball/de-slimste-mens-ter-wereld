import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Game} from "./Models/Game";

@Module({
  imports: [
      TypeOrmModule.forRoot({}),
      TypeOrmModule.forFeature([Game])
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
