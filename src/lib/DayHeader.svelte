<main>
    <h3>
        <slot></slot>
    </h3>
    <div class="days">
        <p>1</p>
        <p>2</p>
        <p>3</p>
        <p>4</p>
        <p>5</p>
        <p>6</p>
        <p>7</p>
        <p>8</p>
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
        transform:rotate(180deg);
    }
</style>