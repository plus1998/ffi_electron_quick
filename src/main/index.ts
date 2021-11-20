/**
 * electron 主进程
 */

declare global {
  namespace NodeJS {
    interface Global {
      mainWindow: any;
    }
  }
}

import WindowClass from './windowClass'

import { join } from 'path'
import { app, BrowserWindow, ipcMain } from 'electron'
import is_dev from 'electron-is-dev'
import dotenv from 'dotenv'
import Store from 'electron-store'
import { findWindow, setForegroundWindow, moveWindow } from './modules/user32'

const store = new Store()
ipcMain.on('store:set', async (e, args) => {
  store.set(args.key, args.value)
})
ipcMain.handle('store:get', async (e, args) => {
  const value = await store.get(args)
  return value
})
ipcMain.on('store:delete', async (e, args) => {
  store.delete(args)
})
ipcMain.on('ACTION', (e: any, { action, data }) => {

})


dotenv.config({ path: join(__dirname, '../../.env') })

let win

class createWin {
  // 创建浏览器窗口
  constructor() {
    win = new BrowserWindow({
      width: is_dev ? 900 : 500,
      height: 800,
      webPreferences: {
        nodeIntegration: true,
        enableRemoteModule: true
      },
    })

    // 全局变量
    global.mainWindow = win

    const URL = is_dev
      ? `http://localhost:${process.env.PORT}` // vite 启动的服务器地址
      : `file://${join(__dirname, '../../dist/render/index.html')}` // vite 构建后的静态文件地址

    win.loadURL(URL)

    if (is_dev) {
      win.webContents.openDevTools()
    }

    // 窗口移动
    let count: number = 0
    win.on('move', function (e) {
      count++;
      const code = count;
      setTimeout(() => {
        if (code === count) {
          console.log('窗口跟随', code, count)
          const bounds = win.getContentBounds()
          // 找到窗口句柄
          const hwnd = findWindow(WindowClass.WeChatLogin, '微信')
          if (hwnd) {
            moveWindow(hwnd, bounds.x, bounds.y + 150, 300, 400)
            count = 0
            setForegroundWindow(hwnd)
            global.mainWindow.send('PUBLIC', { event: 'success-message', data: '跟随成功' })
          }
        }
      }, 100)
    })
  }
}

app.whenReady().then(async () => {
  new createWin
})


app.on('window-all-closed', async () => {
  if (process.platform !== 'darwin') {
    app.quit()
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    new createWin()
  }
})


// 修改app名字
app.setAppUserModelId('Electron大漠插件Demo')

app.setUserTasks([])