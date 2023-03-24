import {SchoolClass} from "./SchoolClass";

export class School {
    private _classes: SchoolClass[] = []

    public addClass(name: string) {
        this._classes.push(new SchoolClass(name))
    }

    get classes(): SchoolClass[] {
        return this._classes;
    }
}