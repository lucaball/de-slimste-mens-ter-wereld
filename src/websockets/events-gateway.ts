import {
    MessageBody,
    OnGatewayConnection,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer
} from "@nestjs/websockets";
import {Server, Socket} from "socket.io";

@WebSocketGateway({namespace: '/games'})
export class EventsGateway implements OnGatewayConnection {

    @WebSocketServer()
    server: Server

    handleConnection(client: Socket, room: string): any {
        client.on('room', function(room) {
            client.join(room);
        });
    }

    @SubscribeMessage('tet')
    async doSomething(@MessageBody() data: any) {
        const number = Math.random().toString(36).substring(2, 15)
        this.server.in(data.room).emit('message', {'html' : `
            <video autoplay>
              <source src="https://dm0qx8t0i9gc9.cloudfront.net/watermarks/video/cW5lDBG/4k-newspaper-with-breaking-news-titles_nkdoqjjsg__c2eb96bcb8d49557e209f98c6ef43cb6__P360.mp4" type="video/mp4">
              Your browser does not support the video tag.
            </video> 
        ` })
    }
}
