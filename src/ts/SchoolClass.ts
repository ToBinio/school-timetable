import type {Week} from "../types/school";
import {createEmptyWeek} from "./util";

export class SchoolClass {
    private readonly _name: string
    private _week: Week

    constructor(name: string) {
        this._name = name;
        this._week = createEmptyWeek()
    }

    get name(): string {
        return this._name;
    }


    get week(): Week {
        return this._week;
    }
}