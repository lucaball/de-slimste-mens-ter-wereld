import { Factory, Seeder } from "typeorm-seeding"
import {Game} from "../Models/Game";

export class Create_Game implements Seeder {
    public async run(factory: Factory): Promise<void> {
        await factory(Game)().createMany(15)
    }
}