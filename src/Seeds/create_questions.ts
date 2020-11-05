import { Factory, Seeder } from "typeorm-seeding"
import {Game} from "../Models/Game";
import {Question} from "../Models/Question";

export class Create_Game implements Seeder {
    public async run(factory: Factory): Promise<void> {
        await factory(Question)({ type: "text" }).createMany(15)
    }
}