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

    constructor(private questionService: QuestionService) {}

    @WebSocketServer()
    server: Server

    private connectedSockets = [];

    handleConnection(socket: Socket, data : any[]): any {
        socket.on('disconnect', () => {
            const index = this.connectedSockets.indexOf(socket.id);
            delete this.connectedSockets[index];
        });

        socket.on('playerJoined', (data: any) =>{
            socket.join(data.room);
            socket.broadcast.emit('playerHasJoined', data.player);
        })
    }

    // @SubscribeMessage('playerJoined')
    // joinRoom(socket: Socket, @MessageBody() data: any) {
    //
    //     socket.join(data.room);
    //     socket.broadcast.emit('playerJoined', {
    //         ... data.player,
    //         game: null
    //     });
    //
    // }

    /***************
     *  QUESTIONS  *
     **************/
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

    @SubscribeMessage('initAddSeconds')
    async addSeconds(@MessageBody() data: any) {
        this.server.in(data.room).emit('addSeconds', {
            seconds: data.seconds
        });
    }
}
