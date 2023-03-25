<script lang="ts">
    import {teachers} from "../stores/teacher.store.js";
    import type {SchoolClass} from "../types/school";

    export let schoolClass: SchoolClass
</script>
<main>
    <h2>{schoolClass.name}</h2>
    <div>
        {#each schoolClass.week as day}
            <div class="day">
                {#each day as hour}
                    <div>
                        <div>
                            <select name="teacher" id="teacher" bind:value={hour.teacher}>
                                <!--                                todo connect-->
                                {#each $teachers as teacher, i}
                                    <option value="{i}">{teacher.name}</option>
                                {/each}
                                <option value="{undefined}"></option>
                            </select>
                        </div>
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
</style>