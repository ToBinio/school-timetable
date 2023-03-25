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

export function addHour(classIndex: number, dayIndex: number, hourIndex: number) {
    school.update(school => {

        let day = school[classIndex].week[dayIndex];

        day[hourIndex] = {teacher: -1, subject: null}

        //last hour
        if (day.length == hourIndex + 1) {
            for (let schoolClass of school) {
                schoolClass.week[dayIndex].push(null);
            }
        }

        return school;
    })
}

export function removeHour(classIndex: number, dayIndex: number, hourIndex: number) {
    school.update(school => {

        let day = school[classIndex].week[dayIndex];

        day[hourIndex] = undefined

        console.log(day.length);
        console.log(hourIndex);

        //todo delete all before as well


        //prelast hour
        let dayLength = getDayLength(school, dayIndex);
        let deleteCount = day.length - Math.max(dayLength + 2, 4);

        for (let schoolClass of school) {

            for (let i = 0; i < deleteCount; i++) {
                schoolClass.week[dayIndex].pop();
            }
        }

        return school;
    })
}

// REMIND: needed?
export const longestDay = derived(school, school => {

    let longestDays = [];

    for (let i = 0; i < 5; i++) {
        longestDays[i] = school[0].week[i].length;
    }

    return longestDays;
})

function getDayLength(school: School, dayIndex: number): number {

    let length = 0;

    for (let schoolClass of school) {

        let day = schoolClass.week[dayIndex];

        let first = -1;

        for (let i = day.length - 1; i >= 0; i--) {
            if (day[i] !== null) {
                first = i;
                break;
            }
        }

        if (length < first) length = first;
    }

    return length;
}