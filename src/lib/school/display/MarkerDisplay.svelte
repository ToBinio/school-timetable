<script lang="ts">
    import {markers} from "../../../ts/marker.js";

    export let markerIndex = 0
</script>
<main>
    <select name="marker" id="marker" bind:value={markerIndex}>
        {#each markers as marker, index}
            <option value="{index}">{marker}</option>
        {/each}
    </select>
</main>
