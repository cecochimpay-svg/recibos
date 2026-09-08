const { app, BrowserWindow, globalShortcut } = require('electron');
const path = require('path');

function createWindow() {
  const win = new BrowserWindow({
    width: 1060,
    height: 720,
    minWidth: 850,
    minHeight: 580,
    autoHideMenuBar: true,
    title: "Portal de Recibos · CECO S.A.",
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      // 🔒 Deshabilitar DevTools a nivel de motor de renderizado
      devTools: false
    }
  });

  // 🔒 Remover completamente la barra de menú superior
  win.removeMenu();

  // 🔒 Bloquear menú contextual (clic derecho -> Inspeccionar)
  win.webContents.on('context-menu', (e) => {
    e.preventDefault();
  });

  // 🔒 Capturar y cancelar atajos de teclado (F12, DevTools, Recargar, Fuente)
  win.webContents.on('before-input-event', (event, input) => {
    const isControlOrCmd = input.control || input.meta;
    const key = input.key.toLowerCase();

    // Bloquear F12
    if (input.key === 'F12') {
      event.preventDefault();
    }
    // Bloquear Ctrl+Shift+I / Cmd+Option+I (DevTools)
    if (isControlOrCmd && input.shift && key === 'i') {
      event.preventDefault();
    }
    // Bloquear Ctrl+Shift+J / Cmd+Option+J (Consola)
    if (isControlOrCmd && input.shift && key === 'j') {
      event.preventDefault();
    }
    // Bloquear Ctrl+Shift+C (Inspeccionar elemento)
    if (isControlOrCmd && input.shift && key === 'c') {
      event.preventDefault();
    }
    // Bloquear Ctrl+U (Ver código fuente HTML)
    if (isControlOrCmd && key === 'u') {
      event.preventDefault();
    }
    // Bloquear F5 o Ctrl+R (Refrescar la app)
    if (input.key === 'F5' || (isControlOrCmd && key === 'r')) {
      event.preventDefault();
    }
  });

  win.loadFile('index.html');
}

app.whenReady().then(createWindow);

// 🔒 Limpieza de atajos al salir
app.on('will-quit', () => {
  globalShortcut.unregisterAll();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});