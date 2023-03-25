<script lang="ts">
    import {getTeacherById, teachers} from "../../stores/teacher.store.js";
    import {addHour, removeHour, school} from "../../stores/school.store.js";
    import {subjects} from "../../stores/subject.store.js";

    export let schoolClassIndex: number

    function onAddHour(day: number, hour: number) {
        addHour(schoolClassIndex, day, hour);
    }

    function onRemoveHour(day: number, hour: number) {
        removeHour(schoolClassIndex, day, hour);
    }
</script>

<main>
    <h2>{$school[schoolClassIndex].name}</h2>
    <div>
        {#each $school[schoolClassIndex].week as day, dayIndex}
            <div class="day">
                {#each day as hour, hourIndex}
                    <div class="hour"
                         style="background-color: {hour !== undefined ? $getTeacherById(hour.teacher).color : ''}">

                        {#if hour !== undefined}
                            <select name="teacher" id="teacher" bind:value={day[hourIndex].teacher}>
                                {#each $teachers as teacher}
                                    <option value="{teacher.id}"
                                            style="background-color: {teacher.color}">{teacher.name}</option>
                                {/each}
                            </select>
                            <select name="subject" id="subject" bind:value={day[hourIndex].subject}>
                                {#each $subjects as subject}
                                    <option value="{subject.id}">{subject.name}</option>
                                {/each}
                                <option value="{undefined}"></option>
                            </select>
                            <button on:click={() => onRemoveHour(dayIndex,hourIndex)}>-</button>
                        {:else}
                            <button on:click={() => onAddHour(dayIndex,hourIndex)}>+</button>
                        {/if}
                    </div>
                {/each}
            </div>
        {/each}
    </div>
</main>

<style>
    h2 {
        height: 50px;
        margin: 0;
        padding: 0;
    }

    .day {
        border: 1px solid black;
    }

    .hour {
        height: 25px;
    }
</style>