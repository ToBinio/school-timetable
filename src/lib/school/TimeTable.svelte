<script lang="ts">
    import SchoolClass from "./SchoolClass.svelte";
    import DayHeader from "./DayHeader.svelte";
    import {addClass, longestDay, school} from "../../stores/school.store.js";
    import {isFilteredClass, isFilterMode} from "../../stores/teacher.store.js";
    import FilterSchoolClass from "./filter/FilterSchoolClass.svelte";

    let className;

    let isClassNameError = false;

    function onAddClass() {

        isClassNameError = false

        if (className == undefined || className.trim() == "") {
            isClassNameError = true;
            return
        }

        addClass(className)

        className = "";
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
    {#if $isFilterMode}
        {#each $school as schoolClass, index}
            {#if $isFilteredClass(index)}
                <FilterSchoolClass schoolClassIndex="{index}"></FilterSchoolClass>
            {/if}
        {/each}
    {:else}
        {#each $school as schoolClass, index}
            <SchoolClass schoolClassIndex="{index}"></SchoolClass>
        {/each}
        <div>
            {#if isClassNameError}
                <div>Dont!</div>
            {/if}
            <input type="text" name="className" id="className" bind:value={className}>
            <button on:click={onAddClass}>Add</button>
        </div>
    {/if}
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