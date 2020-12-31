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

    handleConnection(socket: Socket, room: string): any {

        socket.on('room', (room) => {
            socket.join(room);
        });

        this.activeConnectedUsers.push(socket.id);
        this.activeConnectedUsers[socket.id] =  socket;

        this.activeConnectedUsers.forEach(id => {
            if(id !== socket.id){
                this.activeConnectedUsers[id].emit('initReceive', socket.id)
            }
        });

        socket.on('signal', data => {

            if(!this.activeConnectedUsers.includes(data.socket_id)) return;

            this.activeConnectedUsers[data.socket_id].emit('signal', {
                socket_id: socket.id,
                signal: data.signal
            })
        });

        socket.on('initSend', init_socket_id => {
            this.activeConnectedUsers[init_socket_id].emit('initSend', socket.id);
        });

        socket.on('disconnect', () => {
            const index = this.activeConnectedUsers.indexOf(socket.id);
            delete this.activeConnectedUsers[index]
        })
    }

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
