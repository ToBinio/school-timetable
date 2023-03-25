<script lang="ts">
    import {teachers} from "../stores/teacher.store.js";
    import {addHour, school} from "../stores/school.store.js";

    export let schoolClassIndex: number

    function onAddHour(day: number, hour: number) {
        addHour(schoolClassIndex, day, hour);
    }
</script>
<main>
    <h2>{$school[schoolClassIndex].name}</h2>
    <div>
        {#each $school[schoolClassIndex].week as day, dayIndex}
            <div class="day">
                {#each day as hour, hourIndex}
                    <div class="hour"
                         style="background-color: {hour !== undefined ? $teachers[hour.teacher].color : ''}">

                        {#if hour !== undefined}
                            <select name="teacher" id="teacher" bind:value={day[hourIndex].teacher}>
                                <!--todo connect-->
                                {#each $teachers as teacher}
                                    <option value="{teacher.id}" style="background-color: {teacher.color}">{teacher.name}</option>
                                {/each}
                            </select>
                        {:else}
                            <button on:click={() => onAddHour(dayIndex,hourIndex)}>+</button>
                        {/if}
                    </div>
                {/each}
            </div>
        {/each}
    </div>
</main>

<style>
    h2 {
        height: 50px;
        margin: 0;
        padding: 0;
    }

    .day {
        border: 1px solid black;
    }

    .hour {
        height: 25px;
    }
</style>