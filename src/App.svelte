<script lang="ts">
    import TimeTable from "./lib/school/TimeTable.svelte";
    import Teachers from "./lib/Teachers.svelte";
    import Subjects from "./lib/Subjects.svelte";
    import Save from "./lib/Save.svelte";
</script>

<nav>
    <h1>Stundenplan</h1>
    <div id="save">
        <Save/>
    </div>
</nav>
<div id="body">
    <TimeTable/>
    <div id="legend">
        <Teachers/>
        <Subjects/>
    </div>
</div>

<style lang="scss">
  nav {
    position: relative;

    h1 {
      text-align: center;
    }

    #save {
      position: absolute;
      top: 0;
      right: 0;
    }
  }

  #body {
    display: flex;
    justify-content: space-between;

    width: 100%;
  }
</style>