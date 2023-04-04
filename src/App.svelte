<script lang="ts">
    import TimeTable from "./lib/school/TimeTable.svelte";
    import Teachers from "./lib/Teachers.svelte";
    import Subjects from "./lib/Subjects.svelte";
    import Save from "./lib/Save.svelte";
</script>

<main>
    <div>
        <h1 class="hideOnPrint">Stundenplan</h1>
        <TimeTable/>
    </div>
    <div id="legend">
        <Save/>
        <Teachers/>
        <Subjects/>
    </div>
</main>

<style lang="scss">
  main {
    display: flex;
    justify-content: space-between;

    width: 100%;

    h1 {
      text-align: center;
    }

    #legend {
      display: flex;
      flex-direction: column;

      gap: 20px;
    }
  }
</style>