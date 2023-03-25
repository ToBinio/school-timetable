import type {Day, Week} from "../types/school";

export function createEmptyWeek(): Week {
    let week: Week = [];

    for (let i = 0; i < 5; i++) {
        week.push(createEmptyDay())
    }

    return week;
}

function createEmptyDay(): Day {
    let day: Day = [];

    for (let i = 0; i < 5; i++) {
        day.push({subject: undefined, teacher: undefined})
    }

    return day;
}