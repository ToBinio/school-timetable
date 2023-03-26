import {exists, readTextFile, writeTextFile} from "@tauri-apps/api/fs";
import {BaseDirectory} from "@tauri-apps/api/path";
import {loadDataFromPath} from "../ts/save";
import {get, writable} from "svelte/store";
import type {configData} from "../types/save";

export const config = writable<configData | undefined>(undefined)

export function getMostRecentPath(): string | undefined {

    let configData = get(config);

    if (configData == undefined) return undefined

    return configData.mostRecentPath;
}

export function updateMostRecentPath(path: string) {
    let configData: configData = {mostRecentPath: path};
    writeTextFile("config.json", JSON.stringify(configData, null, 2), {dir: BaseDirectory.AppConfig})

    config.set(configData);
}

//load default
if (await exists("config.json", {dir: BaseDirectory.AppConfig})) {
    let configData: configData = JSON.parse(await readTextFile("config.json", {dir: BaseDirectory.AppConfig}));
    await loadDataFromPath(configData.mostRecentPath);

    config.set(configData);
}