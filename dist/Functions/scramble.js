"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.randomString = exports.scramble = void 0;
function scramble(input) {
    const splittedInput = input.split(' ');
    const scrambledInput = splittedInput.map((splitPart) => randomString(splitPart.length));
    return scrambledInput.join(' ');
}
exports.scramble = scramble;
function randomString(length) {
    return Math.random().toString(36).substring(2, (length + 2));
}
exports.randomString = randomString;
//# sourceMappingURL=scramble.js.map