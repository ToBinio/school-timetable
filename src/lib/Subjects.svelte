<script lang="ts">
    import {addSubject, removeSubject, subjects} from "../stores/subject.store";

    let subjectName;

    function onAddSubject() {

        if (subjects === undefined) {
            //todo error notification
            return
        }

        addSubject(subjectName)
    }

    function onRemoveSubject(id: number) {
        removeSubject(id)
    }
</script>

<main>
    <div>
        {#each $subjects as subject}
            <div>
                <input type="text" name="subjectName" id="subjectName" bind:value={subject.name}>
                <button on:click={() => onRemoveSubject(subject.id)}>X</button>
            </div>
        {/each}
    </div>
    <div>
        <input type="text" name="name" id="name" bind:value={subjectName}>
        <button on:click={onAddSubject}>add</button>
    </div>
</main>