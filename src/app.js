/* @flow */
const {app : app, BrowserWindow : BrowserWindow} = require('electron');
const path : path = require('path');
const url : url = require('url');

let window : BrowserWindow;

function startApp() {

  app.once('ready', () => {
    window = new BrowserWindow({
      width: 800,
      height: 800,
      backgroundColor: "#D6D8DC",
      // Don't show the window until it's ready, this prevents any white flickering
      show: false
    });


    window.loadURL(url.format({
      pathname: path.join(__dirname, '../public_html/index.html'),
      protocol: 'file:',
      slashes: true
    }));

    // Show window when page is ready
    window.once('ready-to-show', () => {
      window.show()
    })
  })
}
startApp();

