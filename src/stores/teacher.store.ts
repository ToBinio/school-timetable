import {derived, get, writable} from "svelte/store";
import type {Teachers} from "../types/school";
import {school} from "./school.store";
import {ask} from "@tauri-apps/api/dialog";

export const teachers = writable<Teachers>([]);

let idCount = 0;

export function createTeacher(name: string, color: string) {
    teachers.update((teachers) => {
        teachers.push({color: color, id: idCount++, name: name})
        return teachers;
    })
}

export async function removeTeacher(id: number) {

    if (!await ask(`"${get(getTeacherById)(id).name}" löschen?`)) return

    teachers.update((teachers) => {

        //remove teacher from TeacherList
        for (let i = 0; i < teachers.length; i++) {
            if (teachers[i].id == id) {
                teachers.splice(i, 1);
                break;
            }
        }

        //remove teacher from School
        school.update(school => {
            for (let schoolClass of school) {
                for (let dayIndex = 0; dayIndex < schoolClass.week.length; dayIndex++) {
                    let day = schoolClass.week[dayIndex];

                    for (let hourIndex = 0; hourIndex < day.length; hourIndex++) {
                        if (day[hourIndex] != null) {
                            for (let i = day[hourIndex].teachers.length - 1; i >= 0; i--) {
                                if (day[hourIndex].teachers[i] == id) {
                                    day[hourIndex].teachers.splice(i, 1);
                                }
                            }
                        }
                    }
                }
            }

            return school;
        })

        return teachers;
    })
}

export const getTeacherById = derived(teachers, teachers => {
    return (id: number) => {
        for (let i = 0; i < teachers.length; i++) {
            if (teachers[i].id == id) {
                return teachers[i];
            }
        }

        //todo set better default color
        return {id: -1, name: "error", color: "#dddddd"}
    }
})

//init
// REMIND: remove

createTeacher("Teach1", "#125421")
createTeacher("Teach2", "#864132")
createTeacher("Teach3", "#91afd5")
