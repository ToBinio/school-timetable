<script lang="ts">
    import {subjects} from "../../../stores/subject.store.js";

    export let subjectIndex = 0
</script>
<main>
    <select name="subject" id="subject" bind:value={subjectIndex}>
        {#each $subjects as subject}
            <option value="{subject.id}">{subject.name}</option>
        {/each}
        <option value="{undefined}"></option>
    </select>
</main>
