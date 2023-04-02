//needs save
import {school} from "./school.store";
import {teachers} from "./teacher.store";
import {subjects} from "./subject.store";
import {writable} from "svelte/store";
import type {School} from "../types/school";

export const needsSave = writable<boolean>(false);

export let currentSchool: School;

school.subscribe((school) => {

    if (JSON.stringify(currentSchool) == JSON.stringify(school)) return

    needsSave.set(true);

    currentSchool = JSON.parse(JSON.stringify(school));
})

teachers.subscribe(() => {
    needsSave.set(true);
})
subjects.subscribe(() => {
    needsSave.set(true);
})