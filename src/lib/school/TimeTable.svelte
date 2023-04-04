<script lang="ts">
    import SchoolClass from "./SchoolClass.svelte";
    import DayHeader from "./DayHeader.svelte";
    import {addClass, longestDay, school} from "../../stores/school.store.js";
    import FilterSchoolClass from "./filter/FilterSchoolClass.svelte";
    import {isFilteredClass, isFilterMode} from "../../stores/filter.store.js";

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
        <div id="create" class="hideOnPrint">
            <input type="text" name="className" id="className" bind:value={className} class:error={isClassNameError}>
            <button on:click={onAddClass} class="circle">+</button>
        </div>
    {/if}
</main>

<style lang="scss">

  @import "../../style/variables";

  .table {
    display: flex;

    .days {
      display: flex;
      flex-direction: column;
      justify-content: space-around;

      padding-top: 50px;
    }

    height: min-content;
  }

  #create {
    width: 100px;

    height: min-content;

    display: flex;
    flex-direction: column;
    align-items: center;

    gap: 5px;

    input {
      width: 100%;

      text-align: center;

      border: none;
      border-radius: 10px;

      font-size: larger;

      padding: 3px 3px 0;

      transition: 0.2s;
    }

    input:focus {
      outline: none;
    }

    button {
      height: 21px;
      width: 45px;

      border-radius: 5px;

      background-color: $light;
    }

    button:hover {
      background-color: $mid;
    }
  }

  #create:hover {
    input {
      background-color: $light;
    }

    input.error {
      outline: 1px solid red;
    }
  }
</style>