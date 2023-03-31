<script lang="ts">
    import TimeTable from "./lib/school/TimeTable.svelte";
    import Teachers from "./lib/Teachers.svelte";
    import Subjects from "./lib/Subjects.svelte";
    import Save from "./lib/Save.svelte";
</script>

<h2>Stundenplan</h2>
<Save/>
<TimeTable/>
<Teachers/>
<Subjects/>