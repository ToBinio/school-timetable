import {derived} from "svelte/store";
import {school} from "./school.store";

export const getWorkHours = derived(school, (school) => {
    return (teacherId: number) => {

        //todo only new hours now double in monday 1 hour

        let count = 0;

        for (let schoolClass of school) {
            for (let day of schoolClass.week) {
                for (let hour of day) {
                    if (hour == null) continue

                    for (let teacher of hour.teachers) {
                        if (teacher == teacherId)
                            count++;
                    }
                }
            }
        }

        return count;
    }
})