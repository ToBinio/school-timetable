<script lang="ts">
    import type {Day} from "../../../types/school";
    import {createEventDispatcher} from "svelte";
    import {getTeacherById, teachers} from "../../../stores/teacher.store.js";

    export let day: Day;
    export let hourIndex: number;

    const dispatch = createEventDispatcher()

    function onAddTeacher() {
        dispatch("add")
    }

    function onCleanTeacher(teacherIndex: number) {
        dispatch("clean", teacherIndex)
    }

</script>

<main id="classTeachers">
    {#each day[hourIndex].teachers as teacher, teacherIndex}

        <div id="classTeacher" style="background-color: {$getTeacherById(teacher).color}">
            <select name="teacher" bind:value={day[hourIndex].teachers[teacherIndex]}
                    on:change={() => onCleanTeacher(teacherIndex)}>
                {#each $teachers as teacher}
                    <option value="{teacher.id}"
                            style="background-color: {teacher.color}">{teacher.name}</option>
                {/each}
                <option value="{undefined}"></option>
            </select>
        </div>

    {/each}
    <button on:click={onAddTeacher} class="schoolRightButton">+</button>
</main>

<style>
    main {
        display: flex;
    }
</style>