<script lang="ts">
    import {createTeacher, removeTeacher, teachers} from "../stores/teacher.store";
    import {getWorkHours} from "../stores/workHour.store.js";

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

    function onRemoveTeacher(id: number) {
        removeTeacher(id)
    }
</script>

<main>
    <div class="teachers">
        {#each $teachers as teacher}
            <div style="background-color: {teacher.color}">
                <input type="text" name="teacherName" id="name" bind:value={teacher.name}>
                <input type="color" name="teacherColor" id="color" bind:value={teacher.color}>
                <button on:click={() => onRemoveTeacher(teacher.id)}>X</button>
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