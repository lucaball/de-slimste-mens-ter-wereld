import {Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {BaseResource} from "./BaseResource";
import {Expose} from "class-transformer";
import {scramble} from "../Functions/scramble";
import {Question} from "./Question";
import {Photo} from "./Photo";
import {GameRound} from "./GameRound";

@Entity()
export class Author extends BaseResource {
    @Column()
    name: string;

    @OneToMany(type => Photo, photo => photo.author) // note: we will create author property in the Photo class below
    photos: Photo[];
}
