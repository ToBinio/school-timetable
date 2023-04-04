<script lang="ts">
    export let hourCount: number = 1;
</script>

<main>
    <h3>
        <slot></slot>
    </h3>
    <div class="days">
        {#each Array(hourCount) as _, i}
            <p>{i + 1}</p>
        {/each}
    </div>
</main>

<style lang="scss">
  @import "../../style/variables";

  main {
    display: flex;
    align-items: center;
    gap: 10px;

    flex: 1;
  }

  .days {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;

    height: 100%;

    margin: 1px 15px 1px 1px;

    p {
      margin-top: calc(($hour-height - 20px) / 2 + 1px);
      margin-bottom: calc(($hour-height - 20px) / 2 + 1px);
      height: 20px;

      font-size: large;
    }
  }

  h3 {
    writing-mode: vertical-rl;
    transform: rotate(180deg);

    font-size: x-large;

    margin: 0 10px 0 20px;
  }
</style>