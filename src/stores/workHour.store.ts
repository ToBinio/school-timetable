import {derived} from "svelte/store";
import {school} from "./school.store";

export const getWorkHours = derived(school, (school) => {
    return (teacherId: number) => {

        let count = 0;

        for (let schoolClass of school) {
            for (let day of schoolClass.week) {
                for (let hour of day) {
                    if (hour == null) continue

                    if (hour.teacher == teacherId)
                        count++;
                }
            }
        }

        return count;
    }
})