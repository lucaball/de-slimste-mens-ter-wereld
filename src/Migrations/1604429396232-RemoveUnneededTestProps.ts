import {MigrationInterface, QueryRunner} from "typeorm";

export class RemoveUnneededTestProps1604429396232 implements MigrationInterface {
    name = 'RemoveUnneededTestProps1604429396232'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `answer` DROP COLUMN `size`");
        await queryRunner.query("ALTER TABLE `answer` DROP COLUMN `x`");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `answer` ADD `x` varchar(255) NOT NULL");
        await queryRunner.query("ALTER TABLE `answer` ADD `size` varchar(255) NOT NULL");
    }

}
