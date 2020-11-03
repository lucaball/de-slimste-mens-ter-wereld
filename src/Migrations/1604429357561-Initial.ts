import {MigrationInterface, QueryRunner} from "typeorm";

export class Initial1604429357561 implements MigrationInterface {
    name = 'Initial1604429357561'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `answer` (`id` varchar(36) NOT NULL, `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, `updatedAt` timestamp NULL, `deletedAt` timestamp NULL, `size` varchar(255) NOT NULL, `x` varchar(255) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `game` (`id` varchar(36) NOT NULL, `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, `updatedAt` timestamp NULL, `deletedAt` timestamp NULL, `size` varchar(255) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `question` (`id` varchar(36) NOT NULL, `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, `updatedAt` timestamp NULL, `deletedAt` timestamp NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("DROP TABLE `question`");
        await queryRunner.query("DROP TABLE `game`");
        await queryRunner.query("DROP TABLE `answer`");
    }

}
