import {derived, get, writable} from "svelte/store";
import type {School, SchoolClass} from "../types/school";
import {createEmptyWeek} from "../ts/util";

export const school = writable<School>([])

export function addClass(name: string) {
    school.update((school) => {

        let schoolClass: SchoolClass = {name: name, week: createEmptyWeek(), defaultTeacher: -1};

        //fix length
        for (let i = 0; i < schoolClass.week.length; i++) {
            let diff = get(longestDay)[i] - schoolClass.week[i].length;

            if (diff > 0) {
                for (let j = 0; j < diff; j++) {
                    schoolClass.week[i].push(null);
                }
            }
        }

        school.push(schoolClass)

        return school
    })
}

export function addHour(classIndex: number, dayIndex: number, hourIndex: number, defaultTeacher: number) {
    school.update(school => {

        let day = school[classIndex].week[dayIndex];

        day[hourIndex] = {teachers: [defaultTeacher], marker: null, subject: null}

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

        day[hourIndex] = null

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

export function addTeacher(classIndex: number, dayIndex: number, hourIndex: number, defaultTeacher: number) {
    school.update(school => {

        school[classIndex].week[dayIndex][hourIndex].teachers.push(defaultTeacher);

        return school;
    })
}

export function cleanTeacher(classIndex: number, dayIndex: number, hourIndex: number, teacherIndex: number) {
    school.update(school => {

        let teachers = school[classIndex].week[dayIndex][hourIndex].teachers;

        if (teachers[teacherIndex] == undefined) {
            teachers.splice(teacherIndex, 1);
        }

        return school;
    })
}

export const longestDay = derived(school, school => {

    let longestDays = [];

    for (let i = 0; i < 5; i++) {

        if (school[0] == undefined) {
            longestDays[i] = 4;
        } else {
            longestDays[i] = school[0].week[i].length;
        }
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

//init
// REMIND: remove

addClass("1A")
addClass("2A")
addClass("3A")
addClass("4A")