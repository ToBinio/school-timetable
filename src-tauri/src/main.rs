// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use std::fs;
use std::fs::File;
use std::io::{Read, Write};

use tauri::generate_handler;

#[tauri::command]
fn save(to_save: String, path: String) {
    //todo handle error

    let mut file =
        File::create(path.clone()).expect(format!("tried generating: {}", path.clone()).as_str());

    file.write_all(&to_save.into_bytes())
        .expect("could not write in file");
}

#[tauri::command]
fn load(path: String) -> String {
    //todo handle error

    let mut file =
        File::open(path.clone()).expect(format!("tried generating: {}", path.clone()).as_str());

    let mut data = "".to_string();

    file.read_to_string(&mut data).expect("could not read Data");

    data
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(generate_handler![save, load])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
