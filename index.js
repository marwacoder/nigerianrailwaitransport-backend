const { app, BrowserWindow, ipcMain } = require('electron')
const {PosPrinter } = require('electron-pos-printer');

app.on('ready', () => {

     const win = new BrowserWindow({
        width: 400,
        height: 800,
        backgroundColor: 'white',
        webPreferences: {
            nodeIntegration: false,
            worldSafeExecuteJavaScript: true,
            contextIsolation: true,
        }
    })
    win.loadFile('./bin/index.html');
    win.webContents.openDevTools();
    ipcMain.on('print', (event, args) => {
        const data = JSON.stringify(args)
        PosPrinter.print(data, options, {
            silent: true,
            preview: true,
            printerName: 'XPC-99'
        })
 .catch((error) => {
    console.error(error);
  });
    })
    
})
   
    
