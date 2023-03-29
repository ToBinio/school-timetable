import type {Day, Week} from "../types/school";
import {get} from "svelte/store";
import {getTeacherById} from "../stores/teacher.store";

export function createEmptyWeek(): Week {
    let week: Week = [];

    for (let i = 0; i < 5; i++) {
        week.push(createEmptyDay())
    }

    return week;
}

function createEmptyDay(): Day {
    let day: Day = [];

    for (let i = 0; i < 4; i++) {
        day.push(null)
    }

    return day;
}

export async function confirmPopUp(text: string): Promise<boolean> {
    return await (confirm(text) as any)
}