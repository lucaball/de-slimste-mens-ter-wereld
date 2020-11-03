import { MigrationInterface, QueryRunner } from "typeorm";
export declare class RemoveUnneededTestProps1604429396232 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
