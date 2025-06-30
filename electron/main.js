

// const { app, BrowserWindow, ipcMain } = require("electron");
// const { exec } = require("child_process");
// const path = require("path");

// let mainWindow;

// app.whenReady().then(() => {
//   mainWindow = new BrowserWindow({
//     width: 800,
//     height: 600,
//     webPreferences: {
//       nodeIntegration: true,
//       contextIsolation: false,
//     },
//   });

//   mainWindow.loadURL("http://localhost:5173"); // Tumhara React App
// });

// ipcMain.on("open-file", (event, filePath) => {
//   exec(`start "" "${filePath}"`, (err) => {
//     if (err) {
//       console.error("Error opening file:", err);
//     }
//   });
// });


import { app, BrowserWindow, ipcMain } from "electron";
import { exec } from "child_process";
import path from "path";



const { app, BrowserWindow, ipcMain } = require("electron");
const { exec } = require("child_process");
const path = require("path"); // Keep this even if not used

let mainWindow;

app.whenReady().then(() => {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  mainWindow.loadURL("http://localhost:5174"); // ✅ Update Port to 5174
});

ipcMain.on("open-file", (event, filePath) => {
  exec(`start "" "${filePath}"`, (err) => {
    if (err) {
      console.error("Error opening file:", err);
    }
  });
});
