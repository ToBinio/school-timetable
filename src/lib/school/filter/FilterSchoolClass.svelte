<script lang="ts">
    import {removeClass, school} from "../../../stores/school.store.js";
    import {getTeacherById, isFilteredHour, isFilteredTeacher, teachers} from "../../../stores/teacher.store.js";
    import {markers} from "../../../ts/marker.js";
    import {getSubjectById} from "../../../stores/subject.store.js";

    export let schoolClassIndex: number

    function onDeleteClass() {
        removeClass(schoolClassIndex)
    }
</script>

<main>
    <div id="header">
        <input type="text" name="className" id="className" bind:value={$school[schoolClassIndex].name}>
        <select name="mainTeacher" id="mainTeacher" bind:value={$school[schoolClassIndex].defaultTeacher}>
            {#each $teachers as teacher}
                <option value="{teacher.id}"
                        style="background-color: {teacher.color}">{teacher.name}</option>
            {/each}
        </select>
        <button on:click={onDeleteClass}>-</button>
    </div>
    <div>
        {#each $school[schoolClassIndex].week as day, dayIndex}
            <div class="day">
                {#each day as hour, hourIndex}
                    <div class="hour">
                        {#if hour !== null && $isFilteredHour(schoolClassIndex, dayIndex, hourIndex)}
                            <div>
                                {#each hour.teachers as teacher}
                                    {#if $isFilteredTeacher(teacher)}
                                        <div>
                                            {$getTeacherById(teacher).name}
                                        </div>
                                    {/if}
                                {/each}
                            </div>
                            <div>
                                {#if day[hourIndex].subject !== null}
                                    {$getSubjectById(day[hourIndex].subject).name}
                                {/if}
                            </div>
                            <div>
                                {#if day[hourIndex].marker !== null}
                                    {markers[day[hourIndex].marker]}
                                {/if}
                            </div>
                        {/if}
                    </div>
                {/each}
            </div>
        {/each}
    </div>
</main>

<style>
    #header {
        height: 50px;
        margin: 0;
        padding: 0;
    }

    h2 {
        margin: 0;
        padding: 0;
    }

    .day {
        border: 1px solid black;
    }

    .hour {
        height: 25px;
        display: flex;
    }
</style>