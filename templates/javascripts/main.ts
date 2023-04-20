// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
import path from 'path'
import { app, BrowserWindow } from 'electron'
declare const CONFIG: any

const createWindow = () => {
  // Create the browser window.
  let win: BrowserWindow | null = new BrowserWindow({
    title: global.CONFIG.name,
    width: global.CONFIG.width,
    height: global.CONFIG.height,
    webPreferences: {
      contextIsolation: true,
      preload: path.join(app.getAppPath(), 'preload', 'index.js')
    }
  })

  // and load the index.html of the app.
  win.loadFile('renderer/index.html')

  // send data to renderer process
  win.webContents.on('did-finish-load', () => {
    if (!win) return
    win.webContents.send('loaded', {
      appName: global.CONFIG.name,
      electronVersion: process.versions.electron,
      nodeVersion: process.versions.node,
      chromiumVersion: process.versions.chrome
    })
  })

  win.on('closed', () => {
    win = null
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})
