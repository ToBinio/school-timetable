<script lang="ts">
    import {markers} from "../../../ts/marker.js";

    export let markerIndex = 0
</script>

<select name="marker" bind:value={markerIndex}>
    {#each markers as marker, index}
        <option value="{index}">{marker}</option>
    {/each}
    <option value="{null}"></option>
</select>

<style lang="scss">
  select {
    background: transparent;
    border: none;
  }
</style>
