//needs save
import {school} from "./school.store";
import {teachers} from "./teacher.store";
import {subjects} from "./subject.store";
import {writable} from "svelte/store";

export const needsSave = writable<boolean>(false);

school.subscribe(() => {
    needsSave.set(true);
})

teachers.subscribe(() => {
    needsSave.set(true);
})
subjects.subscribe(() => {
    needsSave.set(true);
})