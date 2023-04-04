// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use std::fs::File;
use std::io::{Read, Write};

use tauri::generate_handler;

#[tauri::command]
fn save(to_save: String, path: String) -> Result<(), String> {
    let mut file = File::create(path.clone()).map_err(|err| err.to_string())?;

    file.write_all(&to_save.into_bytes())
        .map_err(|err| err.to_string())
}

#[tauri::command]
fn load(path: String) -> Result<String, String> {
    let mut file = File::open(path.clone()).map_err(|err| err.to_string())?;

    let mut data = "".to_string();

    file.read_to_string(&mut data)
        .map_err(|err| err.to_string())?;

    Ok(data)
}

fn main() {

    tauri::Builder::default()
        .invoke_handler(generate_handler![save, load])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
