import {Module} from '@nestjs/common';
import {EventsGateway} from './events-gateway';
import {QuestionService} from "../Question/Service/question.service";
import {TypeOrmModule} from "@nestjs/typeorm";
import {Question} from "../Models/Question";
import {Answer} from "../Models/Answer";

@Module({
    imports: [
        TypeOrmModule.forFeature([Question, Answer]),
    ],
    exports: [
        EventsGateway
    ],
    providers: [EventsGateway, QuestionService]
})
export class WebsocketsModule {
}
