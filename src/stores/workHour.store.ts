import {derived, get} from "svelte/store";
import {longestDay, school} from "./school.store";

export const getWorkHours = derived(school, (school) => {
    return (teacherId: number) => {

        let count = 0;

        for (let dayIndex = 0; dayIndex < 5; dayIndex++) {
            let dayLengths = get(longestDay);

            outer:
                for (let hourIndex = 0; hourIndex < dayLengths[dayIndex]; hourIndex++) {

                    for (let schoolClass of school) {
                        let hour = schoolClass.week[dayIndex][hourIndex];

                        if (hour == null) continue

                        for (let teacher of hour.teachers) {
                            if (teacher == teacherId) {
                                count++;
                                continue outer;
                            }
                        }
                    }
                }
        }

        return count;
    }
})