const electron = require('electron')
// Module to control application life.
const app = electron.app
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow

const path = require('path')
const url = require('url')
const {session} = require('electron')

// Modify the user agent for all requests to the following urls.
// 'Accept': '*/*',
// 'Accept-Language': 'zh-CN,zh;q=0.8,gl;q=0.6,zh-TW;q=0.4',
// 'Connection': 'keep-alive',
// 'Content-Type': 'application/x-www-form-urlencoded',
// 'Referer': 'http://music.163.com',
// 'Cookie': 'appver=2.0.2',
// 'Host': 'music.163.com',
// // 'Cookie': cookie,
// 'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/33.0.1750.152 Safari/537.36',
// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow = null

function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({width: 840,
                                  height: 480,
                                  minWidth: 840,
                                  minHeight: 480})

  // and load the index.html of the app.
  console.log(__dirname);
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, './index.html'),
    protocol: 'file:',
    slashes: true
  }))
  // and load the index.html of the app.


  // Open the DevTools.
  // mainWindow.webContents.openDevTools()
  // Open the DevTools.
  mainWindow.webContents.openDevTools()
  mainWindow.on('close', function (e) {
    // console.log(e);
    e.preventDefault();
    mainWindow.hide();

  })
  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    //
    //
    // mainWindow = null
  })








  const filter = {
    urls: ['http://music.163.com/*']
  }

  session.defaultSession.webRequest.onBeforeSendHeaders(filter, (details, callback) => {
    details.requestHeaders['Accept']='*/*';
    details.requestHeaders['Accept-Language']='zh-CN,zh;q=0.8,gl;q=0.6,zh-TW;q=0.4';
    details.requestHeaders['Connection']='keep-alive';
    details.requestHeaders['Content-Type']='application/x-www-form-urlencoded';
    details.requestHeaders['Referer']='http://music.163.com';
    details.requestHeaders['Cookie']='appver=2.0.2';
    details.requestHeaders['Host']='music.163.com';
    details.requestHeaders['User-Agent']='Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/33.0.1750.152 Safari/537.36';

    callback({cancel: false, requestHeaders: details.requestHeaders})
  })

}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

app.on('before-quit', function (e) {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  // e.preventDefault();
  mainWindow.destroy();
})
// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
  else{
    try {
      mainWindow.show();
    } catch (e) {

    } finally {

    }

  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
