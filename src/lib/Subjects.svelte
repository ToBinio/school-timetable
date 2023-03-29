<script lang="ts">
    import {addSubject, removeSubject} from "../stores/subject.store";
    import {subjects} from "../stores/subject.store.js";
    import {confirmPopUp} from "../ts/util";
    import {get} from "svelte/store";
    import {getTeacherById} from "../stores/teacher.store";

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

    async function onRemoveSubject(id: number, name: string) {
        if (await confirmPopUp(`"${name}" löschen?`))
            removeSubject(id)
    }
</script>

<main>
    <div>
        {#each $subjects as subject}
            <div>
                <input type="text" name="subjectName" id="subjectName" bind:value={subject.name}>
                <button on:click={() => onRemoveSubject(subject.id,subject.name)}>X</button>
            </div>
        {/each}
    </div>
    <div>
        {#if isNameError}
            <div>Dont!</div>
        {/if}
        <input type="text" name="name" id="name" bind:value={subjectName}>
        <button on:click={onAddSubject}>add</button>
    </div>
</main>