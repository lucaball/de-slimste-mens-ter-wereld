import {MiddlewareConsumer, Module, NestModule} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Game} from "./Models/Game";
import {GameRound} from "./Models/GameRound";
import {GameController} from "./Game/Controller/game.controller";
import {GameFactory} from "./Game/Factory/GameFactory";
import {GameService} from "./Game/Service/game.service";
import {GameRoundService} from "./GameRound/Service/game-round.service";
import {QuestionController} from "./Question/Controller/QuestionController";
import {QuestionFactory} from "./Question/Factory/QuestionFactory";
import {Question} from "./Models/Question";
import { AnswerController } from './Answer/Controller/answer.controller';
import {Answer} from "./Models/Answer";
import {FileController} from "./Question/Controller/FileController";
import {MulterModule} from "@nestjs/platform-express";
import {Image} from "./Models/Image";
import {ServeStaticModule} from "@nestjs/serve-static";
import { join } from 'path';
import {Video} from "./Models/Video";
import {GamePlayer} from "./Models/GamePlayer";
import { WebsocketsModule } from './websockets/websockets.module';
import {GamePlayerFactory} from "./GamePlayer/Factory/GamePlayerFactory";
import { DatabaseModule } from './database/database.module';
import {ConfigModule} from "@nestjs/config";
import {InertiaMiddleware} from "./Middleware/inertia.middleware";

@Module({
    imports: [
        ConfigModule.forRoot(),
        ServeStaticModule.forRoot({
            rootPath: join(__dirname, '..', 'client/public'),
        }),
        MulterModule,
        DatabaseModule.forRoot(),
        TypeOrmModule.forFeature([Game, GameRound, Question, Answer, Image, Video, GamePlayer]),
        WebsocketsModule,
    ],
    controllers: [AppController, GameController, QuestionController, AnswerController, FileController],
    providers: [AppService, GameFactory, GameService, GameRoundService, QuestionFactory, GamePlayerFactory],
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer): any {
        consumer.apply(InertiaMiddleware).forRoutes('*')
    }
}
