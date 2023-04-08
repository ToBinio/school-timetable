import {derived, get, writable} from "svelte/store";
import {school} from "./school.store";

const filterTeacherList = writable<number[]>([])
const hiddenClassList = writable<number[]>([])

export function toggleFilterTeacher(teacherID: number) {

    filterTeacherList.update(filterList => {
        let index = filterList.indexOf(teacherID);

        if (index != -1) {
            filterList.splice(index, 1);
        } else {
            filterList.push(teacherID);
        }

        return filterList;
    })
}

export function toggleHideClass(classIndex: number) {

    hiddenClassList.update(filterList => {
        let index = filterList.indexOf(classIndex);

        if (index != -1) {
            filterList.splice(index, 1);
        } else {
            filterList.push(classIndex);
        }

        return filterList;
    })
}

export const isFilteredTeacher = derived(filterTeacherList, filterList => {
    return (id: number) => {
        return filterList.includes(id);
    }
})

export const isFilteredHour = derived(filterTeacherList, filterList => {
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

export const isHiddenClass = derived(hiddenClassList, (hiddenClassList) => {
    return (schoolClassIndex: number) => {
        return hiddenClassList.includes(schoolClassIndex)
    }
})

export const isFilteredClass = derived(isFilteredHour, (isFilteredHour) => {
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

export const isFilterMode = derived(filterTeacherList, filterList => {
    return filterList.length > 0
})