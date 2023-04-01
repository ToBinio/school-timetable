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
    <div>
        <h3>
            Lehrer
        </h3>
        <!--        todo simple view-->
    </div>
    <div id="input" class="row">
        <input type="text" name="teacherName" id="teacherName" bind:value={teacherName} placeholder="name"
               class:error={isTeacherNameError}>
        <input type="color" name="teacherColor" id="teacherColor" bind:value={teacherColor}
               class:error={isTeacherColorError}>
        <button on:click={onCreateTeacher} class="circle">
            +
        </button>
    </div>
    <div id="teachers">
        {#each $teachers as teacher}
            <div style="background-color: {teacher.color}" id="teacher">
                <div class="row">
                    <input type="text" name="teacherName" id="name" bind:value={teacher.name}>
                    <div>
                        {$getWorkHours(teacher.id)}⌛
                    </div>
                    <button on:click={() => onRemoveTeacher(teacher.id)} class="circle">-</button>
                </div>
                <div class="filter">
                    <input type="color" name="teacherColor" id="color" bind:value={teacher.color}>
                    <input type="checkbox" name="visible" id="visible" on:change={() => toggleVisibility(teacher.id)}>
                </div>
            </div>
        {/each}
    </div>
</main>

<style lang="scss">
  #input {
    margin-bottom: 20px;
    padding: 5px;

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
  }

  .row {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;

    gap: 5px;
  }

  #teachers {

    display: flex;
    flex-direction: column;

    gap: 10px;

    #teacher {
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
      }

      input[type=checkbox] {
        padding: 0;
        height: min-content;
      }

      input[type=text] {
        background-color: transparent;
        border: none;
        border-bottom: 1px solid black;

        padding: 0;
      }

      .filter {
        display: flex;
        justify-content: space-between;
      }
    }
  }

  .error {
    border-color: red;
  }

  input, button {
    height: 20px;
    box-sizing: border-box;
  }
</style>