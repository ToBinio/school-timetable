<script lang="ts">

    import {school} from "../stores/school.store";
    import {onDestroy} from "svelte";
    import {teachers} from "../stores/teacher.store";
    import {subjects} from "../stores/subject.store";
    import {open, save} from '@tauri-apps/api/dialog';
    import {invoke} from "@tauri-apps/api";
    import {get} from "svelte/store";
    import type {Data} from "../types/school";

    let needsSave = false;

    let schoolSub = school.subscribe(() => {
        needsSave = true
    })

    let teacherSub = teachers.subscribe(() => {
        needsSave = true
    })

    let subjectSub = subjects.subscribe(() => {
        needsSave = true
    })

    onDestroy(() => {
        schoolSub()
        teacherSub()
        subjectSub()
    })

    async function onSave() {
        let path = await save({
            defaultPath: "test.json",
            title: "stundenplan.json"
        });

        if (path == null) {
            console.log("no path found");
            return
        }

        let data: Data = {
            school: get(school),
            subjects: get(subjects),
            teachers: get(teachers)
        }

        await invoke("save", {toSave: JSON.stringify(data, null, 2), path: path})

        needsSave = false;
    }

    async function onLoad() {
        let path = await open();

        if (path == null) {
            console.log("no path found");
            return
        }

        let dataString: string = await invoke("load", {path: path})

        let data: Data = JSON.parse(dataString);

        console.log(data);

        school.set(data.school);
        subjects.set(data.subjects);
        teachers.set(data.teachers);
    }

</script>

<main>
    <div>
        {needsSave ? "Not saved!" : "saved"}
    </div>
    <button on:click={onSave}>Save</button>
    <button on:click={onLoad}>Load</button>
</main>