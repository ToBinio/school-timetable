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

<style>
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
    }

    .days p {
        margin: 0;
    }

    h3 {
        writing-mode: vertical-rl;
        transform: rotate(180deg);
    }

    p{
        height: 25px;
    }
</style>