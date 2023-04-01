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