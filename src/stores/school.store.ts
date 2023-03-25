import {derived, writable} from "svelte/store";
import type {School} from "../types/school";
import {createEmptyWeek} from "../ts/util";

export const school = writable<School>([])

export function addClass(name: string) {
    school.update((school) => {

        school.push({name: name, week: createEmptyWeek()})

        return school
    })
}

//init
// REMIND: remove

addClass("1A")
addClass("2A")
addClass("3A")
addClass("4A")

export function addHour(classIndex: number, day: number, hour: number) {
    school.update(school => {

        school[classIndex].week[day][hour] = {teacher: -1, subject: undefined}

        return school;
    })
}

export function removeHour(classIndex: number, day: number, hour: number) {
    school.update(school => {

        school[classIndex].week[day][hour] = undefined

        return school;
    })
}

// REMIND: needed?
export const longestDay = derived(school, values => {

    let longestDays = [];

    for (let i = 0; i < 5; i++) {
        longestDays[i] = getLongestDay(values, i);
    }

    return longestDays;
})

function getLongestDay(school: School, dayIndex: number): number {

    let longest = 0;

    for (let schoolClass of school) {
        if (longest < schoolClass.week[dayIndex].length) {
            longest = schoolClass.week[dayIndex].length;
        }
    }

    return longest
}