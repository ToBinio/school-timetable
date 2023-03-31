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
    <div>
        <h3>
            Lehrer
        </h3>
    </div>
    <div id="input" class="row">
        <input type="text" name="teacherName" id="teacherName" bind:value={teacherName} placeholder="name"
               class:error={isTeacherNameError}>
        <input type="color" name="teacherColor" id="teacherColor" bind:value={teacherColor}
               class:error={isTeacherColorError}>
        <button on:click={onCreateTeacher} class="circleButton">
            +
        </button>
    </div>
    <div class="teachers">
        {#each $teachers as teacher}
            <div style="background-color: {teacher.color}" id="teacher">
                <div>
                    <input type="checkbox" name="visible" id="visible" on:change={() => toggleVisibility(teacher.id)}>
                </div>
                <div class="row">
                    <input type="text" name="teacherName" id="name" bind:value={teacher.name}>
                    <input type="color" name="teacherColor" id="color" bind:value={teacher.color}>
                    <button on:click={() => onRemoveTeacher(teacher.id)} class="circleButton">-</button>
                </div>
                <div>
                    <div>Stunden: {$getWorkHours(teacher.id)}</div>
                </div>
            </div>
        {/each}
    </div>
</main>

<style lang="scss">

  #input {
    margin-bottom: 20px;
    padding: 5px;
  }

  .row {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;

    gap: 5px;
  }

  #teacher {

    padding: 5px;

    input[type=checkbox] {
      padding: 0;
      height: min-content;
    }
  }

  .error {
    border-color: red;
  }

  input, button {
    height: 25px;
    box-sizing: border-box;
  }
</style>