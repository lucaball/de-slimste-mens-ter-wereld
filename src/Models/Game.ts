import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";
import {BaseResource} from "./BaseResource";
import {Exclude, Expose} from 'class-transformer';
import {randomString, scramble} from "../Functions/scramble";

@Entity()
export class Game extends BaseResource {

    @Column({nullable: true})
    name: string;

    @Column({unique: true, nullable : false})
    @Exclude()
    joinCode : string;

    @Expose({ groups: ['answered'] })
    data : string = "FREAKING HELL";

    @Expose({ groups: ['unanswered'] })
    scrambled() : string { return scramble(this.data) };

    constructor(partial: Partial<Game> | null = null) {
        super();

        this.joinCode = "#" + randomString(5);
        Object.assign(this, partial);
    }
}
