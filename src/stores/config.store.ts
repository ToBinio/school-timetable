import {createDir, exists, readTextFile, writeTextFile} from "@tauri-apps/api/fs";
import {appConfigDir, BaseDirectory} from "@tauri-apps/api/path";
import {loadDataFromPath} from "../ts/save";
import {derived, get, writable} from "svelte/store";
import type {configData} from "../types/save";
import {needsSave} from "./update.store";
import {school} from "./school.store";

export const config = writable<configData | undefined>(undefined)
export function getMostRecentPath(): string | undefined {

    let configData = get(config);

    if (configData == undefined) return undefined

    return configData.mostRecentPath;
}

export const mostRecentFile = derived(config, config => {

    if (config == undefined) return undefined

    let mostRecentPath = config.mostRecentPath;

    if (mostRecentPath == undefined)
        return undefined;

    return mostRecentPath.split("\\").pop();
})


export function updateMostRecentPath(path: string) {
    let configData: configData = {mostRecentPath: path};
    writeTextFile("config.json", JSON.stringify(configData, null, 2), {dir: BaseDirectory.AppConfig})

    needsSave.set(false)

    config.set(configData);
}

//load default
async function loadDefault() {
    if (!await exists(await appConfigDir())) {
        await createDir(await appConfigDir())
    }

    if (await exists("config.json", {dir: BaseDirectory.AppConfig})) {
        let configData: configData = JSON.parse(await readTextFile("config.json", {dir: BaseDirectory.AppConfig}));

        await loadDataFromPath(configData.mostRecentPath);

        updateMostRecentPath(configData.mostRecentPath)
    }
}

loadDefault().then();