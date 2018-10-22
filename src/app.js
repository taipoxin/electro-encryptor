/* @flow */
const { app, BrowserWindow } = require('electron')
const path: path = require('path')
const url: url = require('url')
const cryptico = require('cryptico')

let window: BrowserWindow

function startApp () {
  app.once('ready', () => {
    window = new BrowserWindow({
      minWidth: 420,
      minHeight: 400,
      width: 800,
      height: 800,
      backgroundColor: '#D6D8DC',
      // Don't show the window until it's ready, this prevents any white flickering
      show: false
    })

    window.loadURL(url.format({
      pathname: path.join(__dirname, '../public_html/index.html'),
      protocol: 'file:',
      slashes: true
    }))

    // Show window when page is ready
    window.once('ready-to-show', () => {
      window.show()
    })
  })
}
startApp()


let express = require('express')
let bodyParser = require('body-parser')
const port = 3000
const exp = express()


exp.use(bodyParser.urlencoded({ extended: true }))
exp.post('/route', (req, res) => {
  console.log(req.body)
  if (req.body.name == 'generateKeys') {
    let result = generateKeys(req.body.data)
    console.log(result)
    res.send(result)
  }
})

exp.get('/route', (req, res) => {
 console.log('get')
})

exp.listen(port, () => {
  console.log(`We are live on ${port}`)
})


function generateKeys (passPhrase: string) {
  // bits are now 1024
  const bits = 1024
  const myRSA_key = cryptico.generateRSAKey(passPhrase, bits)
  const myPublic_key = cryptico.publicKeyString(myRSA_key)
  let rsaKey = myRSA_key
  let rsaPublic = myPublic_key
  return { rsaPublic, rsaKey }
}
