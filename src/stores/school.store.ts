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

export const longestDay = derived(school, values => {

    let longestDays = [];

    for (let i = 0; i < 5; i++) {
        longestDays[i] = getLongestDay(values,i);
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