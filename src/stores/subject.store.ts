import {writable} from "svelte/store";
import type {Subjects} from "../types/school";
import {school} from "./school.store";

export const subjects = writable<Subjects>([])

let idCount = 0;

export function addSubject(name: string) {
    subjects.update((subjects) => {
        subjects.push({id: idCount++, name: name})
        return subjects;
    })
}

export function removeSubject(id: number) {
    subjects.update((subjects) => {

        //remove subject from SubjectList
        for (let i = 0; i < subjects.length; i++) {
            if (subjects[i].id == id) {
                subjects.splice(i, 1);
                break;
            }
        }

        //remove subject from School
        school.update(school => {
            for (let schoolClass of school) {
                for (let dayIndex = 0; dayIndex < schoolClass.week.length; dayIndex++) {
                    let day = schoolClass.week[dayIndex];

                    for (let hourIndex = 0; hourIndex < day.length; hourIndex++) {
                        if (day[hourIndex] != undefined && day[hourIndex].teacher == id) {
                            day[hourIndex].subject = undefined
                        }
                    }
                }
            }

            return school;
        })


        return subjects;
    })
}

//init
// REMIND: remove

addSubject("Sub1")
addSubject("Sub2")
addSubject("Sub3")
