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

    private activeConnectedUsers = [];

    handleConnection(client: Socket, room: string): any {
        client.on('room', function(room) {
            client.join(room);
        });
    }

    @SubscribeMessage('join-room')
    async joinRoom(socket: Socket, room: string){

        if(this.activeConnectedUsers[room]){
            this.activeConnectedUsers[room].push(socket.id);
        }else{
            this.activeConnectedUsers[room] = [socket.id];
        }

        this.server.to(socket.id).emit('all-joined-players',  this.activeConnectedUsers[room].filter(id => id !== socket.id))
    }

    @SubscribeMessage("sending-signal")
    async sendingSignal(socket: Socket, payload){
        this.server.to(payload.userToSignal).emit('user-joined', {
            signal: payload.signal,
            callerID : payload.callerID
        })
    };

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
