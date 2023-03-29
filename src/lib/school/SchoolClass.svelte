<script lang="ts">
    import {getTeacherById, teachers} from "../../stores/teacher.store.js";
    import {addHour, addTeacher, cleanTeacher, removeHour, school} from "../../stores/school.store.js";
    import {subjects} from "../../stores/subject.store.js";
    import {get} from "svelte/store";

    export let schoolClassIndex: number

    function onAddHour(day: number, hour: number) {
        addHour(schoolClassIndex, day, hour, get(school)[schoolClassIndex].defaultTeacher);
    }

    function onRemoveHour(day: number, hour: number) {
        removeHour(schoolClassIndex, day, hour);
    }

    function onAddTeacher(day: number, hour: number) {
        addTeacher(schoolClassIndex, day, hour, get(school)[schoolClassIndex].defaultTeacher);
    }

    function onCleanTeacher(day: number, hour: number, teacher: number) {
        cleanTeacher(schoolClassIndex, day, hour, teacher);
    }

</script>

<main>
    <div id="header">
        <h2>{$school[schoolClassIndex].name}</h2>
        <select name="mainTeacher" id="mainTeacher" bind:value={$school[schoolClassIndex].defaultTeacher}>
            {#each $teachers as teacher}
                <option value="{teacher.id}"
                        style="background-color: {teacher.color}">{teacher.name}</option>
            {/each}
        </select>
    </div>
    <div>
        {#each $school[schoolClassIndex].week as day, dayIndex}
            <div class="day">
                {#each day as hour, hourIndex}
                    <div class="hour">
                        {#if hour !== null}
                            {#each hour.teachers as teacher, teacherIndex}
                                <select name="teacher" id="teacher" bind:value={day[hourIndex].teachers[teacherIndex]}
                                        on:change={() => onCleanTeacher(dayIndex,hourIndex,teacherIndex)}
                                        style="background-color: {$getTeacherById(teacher).color}">
                                    {#each $teachers as teacher}
                                        <option value="{teacher.id}"
                                                style="background-color: {teacher.color}">{teacher.name}</option>
                                    {/each}
                                    <option value="{undefined}"></option>
                                </select>
                            {/each}
                            <button on:click={() => onAddTeacher(dayIndex,hourIndex)}>+</button>
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
    #header {
        height: 50px;
        margin: 0;
        padding: 0;
    }

    h2 {
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