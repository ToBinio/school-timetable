<script lang="ts">
    import {createTeacher, getTeacherById, removeTeacher, teachers} from "../stores/teacher.store";
    import {getWorkHours} from "../stores/workHour.store.js";
    import {get} from "svelte/store";
    import {ask} from "@tauri-apps/api/dialog";
    import {toggleFilterTeacher} from "../stores/filter.store";

    let teacherName;
    let teacherColor;

    let isTeacherNameError = false;
    let isTeacherColorError = false;

    function onCreateTeacher() {

        isTeacherNameError = false;
        isTeacherColorError = false;

        if (teacherName === undefined || teacherName.trim() === "") {
            isTeacherNameError = true;
        }

        if (teacherColor === undefined) {
            isTeacherColorError = true;
        }

        if (isTeacherNameError || isTeacherColorError) return;

        createTeacher(teacherName, teacherColor)

        teacherColor = undefined;
        teacherName = undefined;
    }

    async function onRemoveTeacher(id: number) {
        if (await ask(`"${get(getTeacherById)(id).name}" löschen?`))
            removeTeacher(id)
    }

    function toggleVisibility(id: number) {
        toggleFilterTeacher(id);
    }
</script>

<main>
    <div class="teachers">
        {#each $teachers as teacher}
            <div style="background-color: {teacher.color}">
                <input type="text" name="teacherName" id="name" bind:value={teacher.name}>
                <input type="color" name="teacherColor" id="color" bind:value={teacher.color}>
                <button on:click={() => onRemoveTeacher(teacher.id)}>X</button>
                <input type="checkbox" name="visible" id="visible" on:change={() => toggleVisibility(teacher.id)}>
                <div>Stunden: {$getWorkHours(teacher.id)}</div>
            </div>
        {/each}
    </div>
    <div>
        {#if isTeacherNameError}
            <div>Dont!</div>
        {/if}
        <input type="text" name="teacherName" id="teacherName" bind:value={teacherName}>
        {#if isTeacherColorError}
            <div>Dont!</div>
        {/if}
        <input type="color" name="teacherColor" id="teacherColor" bind:value={teacherColor}>
        <button on:click={onCreateTeacher}>add</button>
    </div>
</main>

<style>
    .teachers div {
        width: min-content;
    }
</style>