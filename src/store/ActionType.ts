export interface TypeInterface {
    saga: string,
    success: string,
    error: string,
}

export class ActionType implements TypeInterface {
    error: string;
    saga: string;
    success: string;

    constructor(base: string) {
        this.saga = base + "_SAGA";
        this.success = base + "_SUCCESS";
        this.error = base + "_ERROR";
    }

}