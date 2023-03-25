<script lang="ts">
    import TimeTable from "./lib/TimeTable.svelte";
    import Teachers from "./lib/Teachers.svelte";
    import {addClass} from "./stores/school.store";

    addClass("1A")
    addClass("2A")
    addClass("3A")

</script>

<h2>Stundenplan</h2>
<TimeTable/>
<Teachers/>

<style>
</style>