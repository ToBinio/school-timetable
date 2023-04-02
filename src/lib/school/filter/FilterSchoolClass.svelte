<script lang="ts">
    import {removeClass, school} from "../../../stores/school.store.js";
    import {getTeacherById, teachers} from "../../../stores/teacher.store.js";
    import {markers} from "../../../ts/marker.js";
    import {getSubjectById} from "../../../stores/subject.store.js";
    import {isFilteredHour, isFilteredTeacher} from "../../../stores/filter.store.js";

    export let schoolClassIndex: number

    function onDeleteClass() {
        removeClass(schoolClassIndex)
    }
</script>

<main class="classTable">
    <div id="schoolHeader">
        <div>
            <input type="text" name="className" id="className" bind:value={$school[schoolClassIndex].name}>
            <button on:click={onDeleteClass} class="circle">-</button>
        </div>
        {#if $school[schoolClassIndex].defaultTeacher !== -1}
            <div  id="classTeacherName" style="background-color: {$getTeacherById($school[schoolClassIndex].defaultTeacher).color}">
                {$getTeacherById($school[schoolClassIndex].defaultTeacher).name}
            </div>
        {/if}
    </div>
    <div>
        {#each $school[schoolClassIndex].week as day, dayIndex}
            <div class="day">
                {#each day as hour, hourIndex}
                    <div class="hour">
                        {#if hour !== null && $isFilteredHour(schoolClassIndex, dayIndex, hourIndex)}
                            <div id="marker">
                                {#if day[hourIndex].marker !== null}
                                    {markers[day[hourIndex].marker]}
                                {/if}
                            </div>
                            <div id="classTeachers">
                                {#each hour.teachers as teacher}
                                    {#if $isFilteredTeacher(teacher)}
                                        <div id="classTeacher"
                                             style="background-color: {$getTeacherById(teacher).color}">
                                            <div>
                                                {$getTeacherById(teacher).name}
                                            </div>
                                        </div>
                                    {/if}
                                {/each}
                            </div>
                            <div id="classSubjects">
                                <main>
                                    {#if day[hourIndex].subject !== null}
                                        <div>
                                            {$getSubjectById(day[hourIndex].subject).name}
                                        </div>
                                    {/if}
                                </main>
                            </div>
                        {/if}
                    </div>
                {/each}
            </div>
        {/each}
    </div>
</main>

<style>
</style>