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
                        <div>{hour.teacher}</div>
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