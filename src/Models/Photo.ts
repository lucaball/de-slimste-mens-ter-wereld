import {Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {BaseResource} from "./BaseResource";
import {Author} from "./Author";

@Entity()
export class Photo extends BaseResource{

    @ManyToOne(type => Author, author => author.photos)
    author: Author;
}
