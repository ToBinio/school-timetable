<script lang="ts">
    import {getTeacherById, teachers} from "../../stores/teacher.store.js";
    import {addHour, addTeacher, cleanTeacher, removeClass, removeHour, school} from "../../stores/school.store.js";
    import {get} from "svelte/store";
    import MarkerDisplay from "./display/MarkerDisplay.svelte";
    import TeacherDisplay from "./display/TeacherDisplay.svelte";
    import SubjectDisplay from "./display/SubjectDisplay.svelte";
    import {toggleHideClass} from "../../stores/filter.store";

    export let schoolClassIndex: number

    function onAddHour(day: number, hour: number) {
        addHour(schoolClassIndex, day, hour, get(school)[schoolClassIndex].defaultTeacher);
    }

    function onAddTeacher(day: number, hour: number) {
        addTeacher(schoolClassIndex, day, hour, get(school)[schoolClassIndex].defaultTeacher);
    }

    function onCleanTeacher(day: number, hour: number, teacher: number) {
        cleanTeacher(schoolClassIndex, day, hour, teacher);
    }

    function onDeleteClass() {
        removeClass(schoolClassIndex)
    }

    function toggleVisibility() {
        toggleHideClass(schoolClassIndex);
    }

</script>

<main class="classTable">
    <div id="schoolHeader">
        <div>
            <button id="hideButton" class="circle" name="hide" on:click={toggleVisibility}><img src="/eye-closed-dark.svg" alt=""></button>
            <input type="text" name="className" id="className" bind:value={$school[schoolClassIndex].name}>
            <button on:click={onDeleteClass} id="removeButton" class="circle">-</button>
        </div>
        <select name="mainTeacher" id="mainTeacher" bind:value={$school[schoolClassIndex].defaultTeacher}
                style="background-color: {$getTeacherById($school[schoolClassIndex].defaultTeacher).color}"
                class:hideOnPrint={$school[schoolClassIndex].defaultTeacher === -1}>
            {#each $teachers as teacher}
                <option value="{teacher.id}"
                        style="background-color: {teacher.color}">{teacher.name}</option>
            {/each}
        </select>
    </div>
    <div>
        {#each $school[schoolClassIndex].week as day, dayIndex}
            <div class="day">
                {#each day as hour, hourIndex}
                    <div class="hour">
                        {#if hour !== null}
                            <div id="marker">
                                <MarkerDisplay bind:markerIndex={day[hourIndex].marker}/>
                            </div>
                            <TeacherDisplay bind:day={day} hourIndex="{hourIndex}"
                                            on:add={() => onAddTeacher(dayIndex,hourIndex)}
                                            on:clean={(teacherIndex) => onCleanTeacher(dayIndex,hourIndex,teacherIndex.detail)}/>
                            <div id="classSubjects">
                                <SubjectDisplay bind:subjectIndex={day[hourIndex].subject}/>
                            </div>
                        {:else}
                            <div class="classAdd">
                                <button on:click={() => onAddHour(dayIndex,hourIndex)}>+</button>
                            </div>
                        {/if}
                    </div>
                {/each}
            </div>
        {/each}
    </div>
</main>