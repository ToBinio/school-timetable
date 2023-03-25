<script>
    import {addTeacher, teachers} from "../stores/teacher.store";

    let teacherName;
    let teacherColor;

    function onCreateTeacher() {

        if (teacherName === undefined || teacherColor === undefined) {
            //todo error notification
            return
        }

        addTeacher(teacherName, teacherColor)
    }
</script>

<main>
    <div class="teachers">
        {#each $teachers as teacher}
            <div style="background-color: {teacher.color}">
                {teacher.name}
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
    .teachers div{
        width: min-content;
    }
</style>