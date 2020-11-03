"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Initial1604429357561 = void 0;
class Initial1604429357561 {
    constructor() {
        this.name = 'Initial1604429357561';
    }
    async up(queryRunner) {
        await queryRunner.query("CREATE TABLE `answer` (`id` varchar(36) NOT NULL, `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, `updatedAt` timestamp NULL, `deletedAt` timestamp NULL, `size` varchar(255) NOT NULL, `x` varchar(255) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `game` (`id` varchar(36) NOT NULL, `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, `updatedAt` timestamp NULL, `deletedAt` timestamp NULL, `size` varchar(255) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `question` (`id` varchar(36) NOT NULL, `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, `updatedAt` timestamp NULL, `deletedAt` timestamp NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
    }
    async down(queryRunner) {
        await queryRunner.query("DROP TABLE `question`");
        await queryRunner.query("DROP TABLE `game`");
        await queryRunner.query("DROP TABLE `answer`");
    }
}
exports.Initial1604429357561 = Initial1604429357561;
//# sourceMappingURL=1604429357561-Initial.js.map