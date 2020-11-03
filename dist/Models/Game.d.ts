import { BaseResource } from "./BaseResource";
export declare class Game extends BaseResource {
    name: string;
    joinCode: string;
    data: string;
    scrambled(): string;
    constructor(partial?: Partial<Game> | null);
}
