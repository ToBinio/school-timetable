import {open, save} from "@tauri-apps/api/dialog";
import {get} from "svelte/store";
import {school} from "../stores/school.store";
import {subjects} from "../stores/subject.store";
import {teachers} from "../stores/teacher.store";
import {invoke} from "@tauri-apps/api";
import type {Data} from "../types/school";
import {needsSave} from "../stores/update.store";
import {getMostRecentPath, updateMostRecentPath} from "../stores/config.store";

export async function saveData() {

    let mostRecentPath = getMostRecentPath();

    if (mostRecentPath != undefined) {
        await saveDataAtPath(mostRecentPath)
    } else {
        await saveDataAs()
    }
}

export async function saveDataAs() {

    let path = await save({
        defaultPath: "test.json",
        title: "stundenplan.json"
    });

    if (path == null) {
        console.log("no path found");
        return
    }

    await saveDataAtPath(path)
}

export async function saveDataAtPath(path: string) {
    let data: Data = {
        school: get(school),
        subjects: get(subjects),
        teachers: get(teachers)
    }

    await invoke("save", {toSave: JSON.stringify(data, null, 2), path: path});

    updateMostRecentPath(path);

    needsSave.set(false)
}

export async function loadData() {
    let path = await open({
        multiple: false
    });

    if (path == null) {
        console.log("no path found");
        return
    }

    await loadDataFromPath(path as string);
}

export async function loadDataFromPath(path: string) {
    let dataString: string = await invoke("load", {path: path})

    let data: Data = JSON.parse(dataString);

    school.set(data.school);
    subjects.set(data.subjects);
    teachers.set(data.teachers);

    needsSave.set(false)

    updateMostRecentPath(path);
}