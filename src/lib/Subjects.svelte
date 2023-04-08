<script lang="ts">
    import {addSubject, removeSubject} from "../stores/subject.store";
    import {subjects} from "../stores/subject.store.js";

    let subjectName;
    let isNameError = false;

    function onAddSubject() {
        isNameError = false;

        if (subjectName === undefined || subjectName.trim() === "") {
            isNameError = true;
            return
        }

        addSubject(subjectName)

        subjectName = "";
    }

    function onRemoveSubject(id: number, name: string) {
        removeSubject(id)
    }
</script>

<main class="hideOnPrint">
    <div id="input">
        <h2>Fächer</h2>

        <div>
            <input type="text" name="name" id="name" bind:value={subjectName} class:error={isNameError}
                   placeholder="neues Fach">
            <button on:click={onAddSubject} class="circle">+</button>
        </div>
    </div>
    {#each $subjects as subject}
        <div id="subject">
            <input type="text" name="subjectName" id="subjectName" bind:value={subject.name}>
            <button on:click={() => onRemoveSubject(subject.id,subject.name)} class="circle">-</button>
        </div>
    {/each}
</main>

<style lang="scss">
  @import "../style/variables";

  main {
    display: flex;
    flex-direction: column;

    gap: 2px;

    h2 {
      margin-top: 8px;
      margin-bottom: 8px;
    }

    #input {
      background-color: transparent;
      padding: 8px;

      div {
        border-radius: 10px;

        display: flex;
        justify-content: space-between;

        button {
          width: 20px;
          height: 20px;

          background-color: $light;
        }
      }
    }

    #subject {
      padding: 8px;
      border-radius: 10px;

      display: flex;
      justify-content: space-between;

      background-color: $light;

      button {
        width: 20px;
        height: 20px;
      }
    }
  }

  input[type=text] {
    background-color: transparent;
    border: none;
    border-bottom: 1px solid $dark;

    padding: 0;
  }

  input[type=text]:focus {
    outline: none;
  }
</style>