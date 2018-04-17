'use strict'

process.on('uncaughtException', function (error) {
  // Handle the error
  console.error('==================uncaughtException==================', error)
})

const { app, BrowserWindow } = require('electron')
const path = require('path')

// let onlineStatusWindow
let mainWindow

app.on('ready', () => {
  
  mainWindow = new BrowserWindow({
    width: 800, 
    height: 400, 
    show: true, 
    webPreferences: {
      nodeIntegration: false,
      preload: path.resolve(path.join(__dirname, 'preload.js'))
    },
  })
  mainWindow.loadURL(path.join('file://', __dirname, 'index.html'))

  mainWindow.openDevTools();

})
