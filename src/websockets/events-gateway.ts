import {
    MessageBody,
    OnGatewayConnection,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer
} from "@nestjs/websockets";
import {Server, Socket} from "socket.io";
import {QuestionService} from "../Question/Service/question.service";

@WebSocketGateway({namespace: '/games'})
export class EventsGateway implements OnGatewayConnection {

    constructor(private questionService: QuestionService) {
    }

    @WebSocketServer()
    server: Server

    handleConnection(client: Socket, room: string): any {
        client.on('room', function(room) {
            client.join(room);
        });
    }

    @SubscribeMessage('activateQuestion')
    async activateQuestion(@MessageBody() data: any) {

        const questionId = data.id;
        const questionWithAnswers = await this.questionService.getOneWithAnsers(questionId);

        this.server.in(data.room).emit('setQuestion', questionWithAnswers);
    }

    @SubscribeMessage('initShowAnswer')
    async showAnswer(@MessageBody() data: any) {
        this.server.in(data.room).emit('showAnswer', data);
    }

    @SubscribeMessage('initActivateUser')
    async setActiveUser(@MessageBody() data: any) {
        this.server.in(data.room).emit('activateUser', data);
    }

    @SubscribeMessage('initStartTicking')
    async startTicking(@MessageBody() data: any) {
        this.server.in(data.room).emit('startTicking');
    }

    @SubscribeMessage('initStopTicking')
    async stopTicking(@MessageBody() data: any) {
        this.server.in(data.room).emit('stopTicking');
    }
}
