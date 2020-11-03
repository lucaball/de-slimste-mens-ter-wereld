import {Column, PrimaryGeneratedColumn} from "typeorm";

export abstract class BaseResource {

    @PrimaryGeneratedColumn("uuid")
    protected id: string;

    @Column({type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    protected createdAt : Date;

    @Column({ nullable : true,  type : "timestamp"  })
    protected updatedAt: Date | null;

    @Column({ nullable: true ,  type : "timestamp" })
    protected deletedAt: Date | null;
}
