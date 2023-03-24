<script lang="ts">
    import {School} from "./ts/school";
    import TimeTable from "./lib/TimeTable.svelte";

    let school = new School();

    school.addClass("1A")
    school.addClass("2A")
    school.addClass("3A")

</script>

<h2>Stundenplan</h2>
<TimeTable school="{school}"></TimeTable>

<style>
</style>