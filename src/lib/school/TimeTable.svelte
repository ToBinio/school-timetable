<script lang="ts">
    import SchoolClass from "./SchoolClass.svelte";
    import DayHeader from "./DayHeader.svelte";
    import {addClass, longestDay, school} from "../../stores/school.store.js";
    import FilterSchoolClass from "./filter/FilterSchoolClass.svelte";
    import {isFilteredClass, isFilterMode, isHiddenClass, toggleHideClass} from "../../stores/filter.store.js";

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

    function toggleVisibility(schoolClassIndex: number) {
        toggleHideClass(schoolClassIndex);
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
            {#if $isFilteredClass(index) && !$isHiddenClass(index) }
                <FilterSchoolClass schoolClassIndex="{index}"></FilterSchoolClass>
            {/if}
        {/each}
        <div class="hideOnPrint create">
            <div style="height: 50px"></div>
            <div class="hiddenClasses">
                {#each $school as schoolClass, index}
                    {#if $isHiddenClass(index) && $isFilteredClass(index)}
                        <div>
                            <p>
                                {schoolClass.name}
                            </p>
                            <button on:click={() => {toggleVisibility(index)}} class="circle"><img
                                    src="public/eye-open.svg" alt="">
                            </button>
                        </div>
                    {/if}
                {/each}
            </div>
        </div>
    {:else}
        {#each $school as schoolClass, index}
            {#if !$isHiddenClass(index)}
                <SchoolClass schoolClassIndex="{index}"></SchoolClass>
            {/if}
        {/each}
        <div class="hideOnPrint create">
            <input type="text" name="className" id="className" bind:value={className} class:error={isClassNameError}>
            <button on:click={onAddClass} class="circle">+</button>
            <div class="hiddenClasses">
                {#each $school as schoolClass, index}
                    {#if $isHiddenClass(index)}
                        <div>
                            <p>
                                {schoolClass.name}
                            </p>
                            <button on:click={() => {toggleVisibility(index)}} class="circle"><img
                                    src="public/eye-open.svg" alt="">
                            </button>
                        </div>
                    {/if}
                {/each}
            </div>
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

  .create {
    width: 120px;

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

      padding: 3px;

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

    .hiddenClasses {
      display: flex;
      flex-direction: column;
      align-items: center;

      gap: 5px;

      div {

        background-color: $light;

        width: 100px;

        display: flex;
        align-items: center;

        gap: 5px;

        padding: 3px;
        border-radius: 5px;

        p {
          margin: 0;
          font-size: larger;

          padding-left: 3px;

          width: 72px;

          overflow: hidden;
          white-space: nowrap;
        }

        button {
          border-radius: 10px;

          width: 25px;
          height: 25px;

          img {
            padding: 2.5px;
            width: 20px;
            height: 20px;
          }

          background-color: transparent;
        }
      }
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