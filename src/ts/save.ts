import {open, save} from "@tauri-apps/api/dialog";
import {get} from "svelte/store";
import {school} from "../stores/school.store";
import {subjects} from "../stores/subject.store";
import {teachers} from "../stores/teacher.store";
import {invoke} from "@tauri-apps/api";
import type {Data} from "../types/school";
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
        defaultPath: "stundenplan.table",
        title: "Stundenplan",
        filters: [{name: "", extensions: ["table"]}]
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

    try {
        await invoke("save", {toSave: JSON.stringify(data, null, 2), path: path});

        updateMostRecentPath(path);
    } catch (err) {
        alert("Konnte file: " + path + " nicht speicher!\n" + err)
    }
}

export async function loadData() {
    let path = await open({
        multiple: false,
        filters: [{name: "", extensions: ["table"]}]
    });

    if (path == null) {
        console.log("no path found");
        return
    }

    await loadDataFromPath(path as string);
}

export async function loadDataFromPath(path: string) {

    console.log("loading from path: " + path);

    try {
        let dataString: string = await invoke("load", {path: path})

        let data: Data = JSON.parse(dataString);

        school.set(data.school);
        subjects.set(data.subjects);
        teachers.set(data.teachers);

        updateMostRecentPath(path);
    } catch (err) {
        alert("Konnte file: " + path + " nicht lesen!\n" + err)
    }
}