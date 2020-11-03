import { AppService } from './app.service';
import { Game } from "./Models/Game";
import { Repository } from "typeorm";
export declare class AppController {
    private gameRepository;
    private readonly appService;
    constructor(gameRepository: Repository<Game>, appService: AppService);
    getHello(): Promise<Game[]>;
}
