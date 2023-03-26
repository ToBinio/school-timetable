<script lang="ts">

    import {saveData} from "../ts/save";
    import {loadData, saveDataAs} from "../ts/save.js";
    import {needsSave} from "../stores/update.store";
    import {config} from "../stores/config.store.js";
</script>

<main>
    <div>
        {$needsSave ? "Not saved!" : "saved"}
    </div>
    {#if $config !== undefined}
        <button on:click={saveData}>Save - {$config.mostRecentPath}</button>
    {/if}
    <button on:click={saveDataAs}>SaveAs</button>
    <button on:click={loadData}>Load</button>
</main>