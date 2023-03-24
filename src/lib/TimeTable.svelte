<script lang="ts">
    import {School} from "../ts/school";
    import SchoolClass from "./SchoolClass.svelte";
    import DayHeader from "./DayHeader.svelte";

    export let school: School;
</script>

<main class="table">
    <div class="days">
        <DayHeader>Montag</DayHeader>
        <DayHeader>Dienstag</DayHeader>
        <DayHeader>Mittwoch</DayHeader>
        <DayHeader>Donnerstag</DayHeader>
        <DayHeader>Freitag</DayHeader>
    </div>
    {#each school.classes as schoolClass}
        <SchoolClass schoolClass="{schoolClass}"></SchoolClass>
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