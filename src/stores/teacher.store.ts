import {writable} from "svelte/store";
import type {Teachers} from "../types/school";

export const teachers = writable<Teachers>([]);

let idCount = 0;

export function addTeacher(name: string, color: string) {
    teachers.update((teachers) => {
        teachers.push({color: color, id: idCount++, name: name})
        return teachers;
    })
}

//init
// REMIND: remove

addTeacher("Test1", "#125421")
addTeacher("Test2", "#864132")
addTeacher("Test3", "#91afd5")