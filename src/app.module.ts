import {MiddlewareConsumer, Module, NestModule} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Game} from "./Models/Game";
import {GameRound} from "./Models/GameRound";
import * as inertia from 'inertia-node/src';
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
import {AdminModule} from "@admin-bro/nestjs";

@Module({
    imports: [
        ServeStaticModule.forRoot({
            rootPath: join(__dirname, '..', 'client/public'),
        }),
        // AdminModule.createAdmin({
        //     adminBroOptions : {
        //         rootPath: '/admin',
        //         resources: [],
        //     }
        // }),
        MulterModule,
        TypeOrmModule.forRoot({}),
        TypeOrmModule.forFeature([Game, GameRound, Question, Answer, Image, Video, GamePlayer]),
    ],
    controllers: [AppController, GameController, QuestionController, AnswerController, FileController],
    providers: [AppService, GameFactory, GameService, GameRoundService, QuestionFactory],
})

export class AppModule implements NestModule {

    public ASSET_VERSION = "1";
    public html = (page, viewData) => `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
            <script src="/runtime.js" defer></script>
            <script src="/vendors~main.js" defer></script>
            <script src="/main.js" defer></script>
            <link rel="stylesheet" href="/main.css">
            <link rel="stylesheet" href="/style.css">
        
        <!-- Custom data -->
        <title>${viewData.title}</title>
      </head>
    
      <!-- The Inertia page object -->
      <body>
        <div  id="app" data-page='${JSON.stringify(page)}'></div>
        </body>
    </html>
    `;

    configure(consumer: MiddlewareConsumer): any {
        consumer.apply(inertia(this.html, this.ASSET_VERSION)).forRoutes('*')
    }
}
