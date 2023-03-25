<script lang="ts">
    import SchoolClass from "./SchoolClass.svelte";
    import DayHeader from "./DayHeader.svelte";
    import {longestDay, school} from "../stores/school.store.js";
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