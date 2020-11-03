"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RemoveUnneededTestProps1604429396232 = void 0;
class RemoveUnneededTestProps1604429396232 {
    constructor() {
        this.name = 'RemoveUnneededTestProps1604429396232';
    }
    async up(queryRunner) {
        await queryRunner.query("ALTER TABLE `answer` DROP COLUMN `size`");
        await queryRunner.query("ALTER TABLE `answer` DROP COLUMN `x`");
    }
    async down(queryRunner) {
        await queryRunner.query("ALTER TABLE `answer` ADD `x` varchar(255) NOT NULL");
        await queryRunner.query("ALTER TABLE `answer` ADD `size` varchar(255) NOT NULL");
    }
}
exports.RemoveUnneededTestProps1604429396232 = RemoveUnneededTestProps1604429396232;
//# sourceMappingURL=1604429396232-RemoveUnneededTestProps.js.map