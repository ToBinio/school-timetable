<script lang="ts">
    import {createTeacher, removeTeacher, teachers} from "../stores/teacher.store";
    import {getWorkHours} from "../stores/workHour.store.js";
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

    function onRemoveTeacher(id: number) {
        removeTeacher(id)
    }

    function toggleVisibility(id: number) {
        toggleFilterTeacher(id);
    }
</script>

<main>
    <div id="input">

        <h2>
            Lehrer
        </h2>

        <div class="row">
            <input type="text" name="teacherName" id="teacherName" bind:value={teacherName} placeholder="name"
                   class:error={isTeacherNameError}>
            <input type="color" name="teacherColor" id="teacherColor" bind:value={teacherColor}
                   class:error={isTeacherColorError}>
            <button on:click={onCreateTeacher} class="circle">
                +
            </button>
        </div>
    </div>

    {#each $teachers as teacher}
        <div style="background-color: {teacher.color}" class="teacher">
            <div class="row">
                <input type="text" name="teacherName" bind:value={teacher.name}>
                <div>
                    {$getWorkHours(teacher.id)}
                    <mark>⌛</mark>
                </div>
                <button on:click={() => onRemoveTeacher(teacher.id)} class="circle">-</button>
            </div>
            <div class="filter">
                <input type="color" name="teacherColor" id="color" bind:value={teacher.color}>
                <input type="checkbox" name="visible" on:change={() => toggleVisibility(teacher.id)}>
            </div>
        </div>
    {/each}
</main>

<style lang="scss">
  #input {
    padding: 8px;

    input[type="color"] {
      border-radius: 3px;
      border: none;
      padding: 0;
    }

    input[type="color"]::-webkit-color-swatch-wrapper {
      padding: 0;
      border-radius: 2px;
      overflow: hidden;
    }

    input[type="color"]::-webkit-color-swatch {
      border: none;
    }

    h2 {
      margin-top: 8px;
      margin-bottom: 8px;
    }
  }

  .row {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;

    gap: 5px;
  }

  main {

    display: flex;
    flex-direction: column;

    gap: 10px;

    .teacher {
      padding: 8px;

      display: flex;
      flex-direction: column;

      gap: 3px;

      border-radius: 10px;

      input[type="color"] {

        position: relative;

        border-radius: 3px;
        border: none;
        padding: 0;
      }

      input[type="color"]::-webkit-color-swatch-wrapper {
        padding: 0;
        border-radius: 2px;
        overflow: hidden;
      }

      input[type="color"]::-webkit-color-swatch {
        border: none;
      }

      input[type=color]:after {
        opacity: 1;

        top: 0;

        scale: 1.2;

        position: absolute;
        content: "🎨";

        transition: 0.2s;

        text-shadow: 0 0 6px transparentize(black, 0.5);
      }

      input[type=color]:hover:after {
        text-shadow: 0 0 8px black;
      }

      input[type=checkbox] {
        padding: 0;
        margin: 0;

        position: relative;

        width: 20px;
        height: 20px;

        appearance: none;
      }

      input[type=checkbox]:after{
        position: absolute;

        top: 0;
        left: 0;

        content: "";

        width: 20px;
        height: 20px;

        background: url("../../public/eye-closed.svg") no-repeat top left;
        background-size: contain;
      }

      input[type=checkbox]:checked:after{
        background: url("../../public/eye-open.svg") no-repeat top left;
        background-size: contain;
      }

      .filter {
        display: flex;
        justify-content: space-between;
      }
    }

    mark {
      background: none;
      text-shadow: 0 0 6px transparentize(black, 0.5);
    }
  }

  .error {
    border-color: red;
  }

  input, button {
    height: 20px;
    box-sizing: border-box;
  }


  input[type=text] {
    background-color: transparent;
    border: none;
    border-bottom: 1px solid black;

    padding: 0;
  }

</style>