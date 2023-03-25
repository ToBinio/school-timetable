<script lang="ts">
    import {addTeacher, removeTeacher, teachers} from "../stores/teacher.store";

    let teacherName;
    let teacherColor;

    function onCreateTeacher() {

        if (teacherName === undefined || teacherColor === undefined) {
            //todo error notification
            return
        }

        addTeacher(teacherName, teacherColor)
    };

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
            </div>
        {/each}
    </div>
    <div>
        <input type="text" name="teacherName" id="teacherName" bind:value={teacherName}>
        <input type="color" name="teacherColor" id="teacherColor" bind:value={teacherColor}>
        <button on:click={onCreateTeacher}>add</button>
    </div>
</main>

<style>
    .teachers div {
        width: min-content;
    }
</style>