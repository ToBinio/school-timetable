<script lang="ts">
    import {SchoolClass} from "../ts/SchoolClass";

    export let schoolClass: SchoolClass
</script>
<main>
    <h2>{schoolClass.name}</h2>
    <div>
        {#each schoolClass.week as day}
            <div class="day">
                {#each day as hour}
                    <div>
                        <h3>{hour.teacher}</h3>
                    </div>
                {/each}
            </div>
        {/each}
    </div>
</main>

<style>
    .day {
        border: 1px solid black;
    }
</style>