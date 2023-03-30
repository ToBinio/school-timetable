<script lang="ts">
    import type {Day} from "../../../types/school";
    import {createEventDispatcher} from "svelte";
    import {getTeacherById, isFilterdTeacher, teachers} from "../../../stores/teacher.store.js";

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

<main>
    {#each day[hourIndex].teachers as teacher, teacherIndex}

        {#if $isFilterdTeacher(teacher)}
            <div>
                <select name="teacher" id="teacher" bind:value={day[hourIndex].teachers[teacherIndex]}
                        on:change={() => onCleanTeacher(teacherIndex)}
                        style="background-color: {$getTeacherById(teacher).color}">
                    {#each $teachers as teacher}
                        <option value="{teacher.id}"
                                style="background-color: {teacher.color}">{teacher.name}</option>
                    {/each}
                    <option value="{undefined}"></option>
                </select>
            </div>
        {/if}

    {/each}
    <button on:click={onAddTeacher}>+</button>
</main>

<style>
    main {
        display: flex;
    }
</style>