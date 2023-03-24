<script lang="ts">
    import {School} from "../ts/school";
    import SchoolClass from "./SchoolClass.svelte";

    export let school: School;
</script>

<main>
    <h2>TimeTable</h2>
    <div class="table">
        <div class="days">
            <div>Montag</div>
            <div>Dienstag</div>
            <div>Mittwoch</div>
            <div>Donnerstag</div>
            <div>Freitag</div>
        </div>
        {#each school.classes as schoolClass}
            <SchoolClass schoolClass="{schoolClass}"></SchoolClass>
        {/each}
    </div>
</main>

<style>
    .table {
        display: flex;
    }

    .days{
        display: flex;
        flex-direction: column;
        justify-content: space-around;
    }
</style>