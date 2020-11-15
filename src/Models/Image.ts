import {Column, Entity} from "typeorm";
import {BaseResource} from "./BaseResource";

@Entity()
export class Image extends BaseResource {
    @Column()
    name: string;

    @Column()
    path: string;
}
