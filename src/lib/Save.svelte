<script lang="ts">

    import {saveData} from "../ts/save";
    import {loadData, saveDataAs} from "../ts/save.js";
    import {needsSave} from "../stores/update.store";
    import {config, mostRecentFile} from "../stores/config.store.js";
</script>

<main>
    <div id="needSave">
        {#if $needsSave}
            <div id="outer">
                <div id="inner">

                </div>
            </div>

            {#if $config !== undefined}
                <button on:click={saveData}>Save - {$mostRecentFile}</button>
            {/if}
        {/if}
    </div>
    <div id="save">
        <button on:click={saveDataAs}>SaveAs</button>
        <button on:click={loadData}>Load</button>
    </div>
</main>

<style lang="scss">
  @media print {
    main {
      display: none;
    }
  }

  #needSave {
    display: flex;
    align-items: center;

    gap: 10px;
  }

  #save {
    display: flex;
    justify-content: flex-end;
  }

  #outer {
    width: 10px;
    height: 10px;
    background-color: red;

    border-radius: 50%;

    animation-name: outerBeat;
    animation-duration: 2s;
    animation-iteration-count: infinite;

    animation-timing-function: linear;

    #inner {
      width: 10px;
      height: 10px;
      background-color: red;

      border-radius: 50%;

      animation-name: innerBeat;
      animation-duration: 2s;
      animation-iteration-count: infinite;

      animation-timing-function: linear;
    }
  }

  @keyframes outerBeat {

    from {
      scale: 1;
    }

    30% {
      scale: 2;
    }

    to {
      scale: 1;
    }
  }

  @keyframes innerBeat {

    from {
      scale: 1;

      filter: opacity(60%);
    }

    25% {
      scale: 1;

      filter: opacity(60%);
    }

    50% {
      scale: 2;
      filter: opacity(30%);
    }

    70% {
      scale: 3;
      filter: opacity(0%);
    }

    to {
      scale: 3;
      filter: opacity(0%);
    }
  }

</style>