import {derived, get, writable} from "svelte/store";
import {school} from "./school.store";

const filterList = writable<number[]>([])

export function toggleFilterTeacher(teacherID: number) {

    filterList.update(filterList => {
        let index = filterList.indexOf(teacherID);

        if (index != -1) {
            filterList.splice(index, 1);
        } else {
            filterList.push(teacherID);
        }

        return filterList;
    })
}

export const isFilteredTeacher = derived(filterList, filterList => {
    return (id: number) => {
        return filterList.includes(id);
    }
})

export const isFilteredHour = derived(filterList, filterList => {
    return (schoolClassIndex: number, dayIndex: number, hourIndex: number) => {

        let schoolClasses = get(school);

        let hour = schoolClasses[schoolClassIndex].week[dayIndex][hourIndex];

        if (hour == null) return false

        for (let teacher of hour.teachers) {

            if (filterList.includes(teacher)) {
                return true
            }
        }

        return false
    }
})

export const isFilteredClass = derived(isFilteredHour, isFilteredHour => {
    return (schoolClassIndex: number) => {

        let schoolClasses = get(school);

        for (let dayIndex = 0; dayIndex < 5; dayIndex++) {
            for (let hourIndex = 0; hourIndex < schoolClasses[schoolClassIndex].week[dayIndex].length; hourIndex++) {
                if (isFilteredHour(schoolClassIndex, dayIndex, hourIndex))
                    return true;
            }
        }

        return false;
    }
})

export const isFilterMode = derived(filterList, filterList => {
    return filterList.length > 0
})