//needs save
import {school} from "./school.store";
import {teachers} from "./teacher.store";
import {subjects} from "./subject.store";
import {get, writable} from "svelte/store";
import type {School} from "../types/school";
import {appWindow} from "@tauri-apps/api/window";
import {ask} from "@tauri-apps/api/dialog";

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

await appWindow.listen("tauri://close-requested", async ({event, payload}) => {

    if (get(needsSave)) {
        if (!(await ask("Manche Änderungen wurden noch nicht gespeichert.\nTrotzdem fortfahren?"))) {
            return
        }
    }

    await appWindow.close();
});