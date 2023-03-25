import {derived, writable} from "svelte/store";
import type {Teachers} from "../types/school";
import {school} from "./school.store";

export const teachers = writable<Teachers>([]);

let idCount = 0;

export function addTeacher(name: string, color: string) {
    teachers.update((teachers) => {
        teachers.push({color: color, id: idCount++, name: name})
        return teachers;
    })
}

export function removeTeacher(id: number) {
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
                        if (day[hourIndex] != null && day[hourIndex].teacher == id) {
                            day[hourIndex].teacher = -1
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

        return {id: -1, name: "error", color: "#ffffff"}
    }
})

//init
// REMIND: remove

addTeacher("Teach1", "#125421")
addTeacher("Teach2", "#864132")
addTeacher("Teach3", "#91afd5")
