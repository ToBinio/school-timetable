<script lang="ts">
    import SchoolClass from "./SchoolClass.svelte";
    import DayHeader from "./DayHeader.svelte";
    import {addClass, longestDay, school} from "../../stores/school.store.js";

    let className;

    function onAddClass() {
        addClass(className)
    }
</script>

<main class="table">
    <div class="days">
        <DayHeader hourCount="{$longestDay[0]}">Montag</DayHeader>
        <DayHeader hourCount="{$longestDay[1]}">Dienstag</DayHeader>
        <DayHeader hourCount="{$longestDay[2]}">Mittwoch</DayHeader>
        <DayHeader hourCount="{$longestDay[3]}">Donnerstag</DayHeader>
        <DayHeader hourCount="{$longestDay[4]}">Freitag</DayHeader>
    </div>
    {#each $school as schoolClass, index}
        <SchoolClass schoolClassIndex="{index}"></SchoolClass>
    {/each}
    <div>
        <button on:click={onAddClass}>Add</button>
        <input type="text" name="className" id="className" bind:value={className}>
    </div>
</main>

<style>
    .table {
        display: flex;
    }

    .days {
        display: flex;
        flex-direction: column;
        justify-content: space-around;

        padding-top: 50px;
    }
</style>