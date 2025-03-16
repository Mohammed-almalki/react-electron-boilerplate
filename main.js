const { app, BrowserWindow, Menu, session, globalShortcut } = require('electron')
const path = require('path')


isDev = true;


function rootDir(file) {
    return path.join(__dirname, file)
}


function createWindow() {
    Menu.setApplicationMenu(null);
    const mainWindow = new BrowserWindow({
        icon: rootDir('build/icon.png'),
        width: 800,
        height: 600,
        webPreferences: {
            preload: rootDir('preload/shared.js'),
            devTools: isDev,
        },
    });


    session.defaultSession.webRequest.onHeadersReceived((details, callback) => {
        callback({
            responseHeaders: {
                ...details.responseHeaders,
                'Content-Security-Policy': [isDev ? "" : "default-src 'self'"]
            }
        })
    });


    if (isDev) {
        mainWindow.loadURL("http://localhost:5173");
        globalShortcut.register("F2", () => {
            mainWindow.webContents.openDevTools();
        });
        globalShortcut.register("Ctrl+R", () => {
            mainWindow.webContents.reload();
        });
    } else {
        mainWindow.loadFile(rootDir("/dist/index.html"));
    }
}


app.whenReady().then(() => {
    createWindow();
})


app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit()
})


app.on('web-contents-created', (event, contents) => {
    contents.setWindowOpenHandler(({ url }) => {
        return { action: 'deny' }
    })
})