<script lang="ts">

    import {saveData} from "../ts/save";
    import {loadData, saveDataAs} from "../ts/save.js";
    import {needsSave} from "../stores/update.store";
    import {config, mostRecentFile} from "../stores/config.store.js";
</script>

<main class="hideOnPrint">
    {#if $needsSave}
        <div id="outer">
            <div id="inner">

            </div>
        </div>
    {/if}
    <div id="buttons">
        <div id="needSave">
            {#if $config !== undefined}
                <button on:click={saveData}>save - {$mostRecentFile}</button>
            {/if}
        </div>
        <div id="save">
            <button on:click={saveDataAs}>save as</button>
            <button on:click={loadData} class="left">load</button>
            <button on:click={() => window.print()} class="left">print</button>
        </div>
    </div>
</main>

<style lang="scss">
  @import "../style/variables";

  main {
    position: relative;

    margin: 5px;

    #buttons {
      border-radius: 10px;

      overflow: clip;

      #needSave {

        button {
          width: 100%;
          border-bottom: 1px solid $mid;

          max-width: 250px;
          white-space: nowrap;
        }
      }

      #save {
        display: flex;

        button {
          width: 50%;
        }

        .left {
          border-left: 1px solid $mid;
        }
      }

      button {
        padding: 5px;
        border: none;
        background-color: $light;

        transition: 0.2s;
      }

      button:hover {
        background-color: $mid;
      }

      button:focus{
        outline: none;
      }
    }

    #outer {

      position: absolute;
      top: -5px;
      left: -5px;

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
  }

  @keyframes outerBeat {

    from {
      scale: 1;
      background-color: red;
    }

    30% {
      scale: 2;
      background-color: darkred;
    }

    to {
      scale: 1;
      background-color: red;
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

    60% {
      scale: 3;
      filter: opacity(0%);
    }

    to {
      scale: 3;
      filter: opacity(0%);
    }
  }
</style>