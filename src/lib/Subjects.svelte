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

<main>
    <div>
        <h3>Fächer</h3>
    </div>
    <div>
        {#if isNameError}
            <div>Dont!</div>
        {/if}
        <input type="text" name="name" id="name" bind:value={subjectName}>
        <button on:click={onAddSubject}>add</button>
    </div>
    <div>
        {#each $subjects as subject}
            <div>
                <input type="text" name="subjectName" id="subjectName" bind:value={subject.name}>
                <button on:click={() => onRemoveSubject(subject.id,subject.name)}>X</button>
            </div>
        {/each}
    </div>
</main>