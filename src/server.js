


const cryptico = require('cryptico')
let util = require('util')
let express = require('express')
let bodyParser = require('body-parser')
const port = 3000
const exp = express()

function recStringify(o) {
  var seen = [];
  return JSON.stringify(o, function(_, value) {
    if (typeof value === 'object' && value !== null) {
        if (seen.indexOf(value) !== -1) return;
        else seen.push(value);
      }
      return value;
  });    
} 
let a = {
p: {
  '0': 6271165,
  '1': 362925006,
  '2': 570736266,
  '3': 538736803,
  '4': 32738875,
  '5': 1001546651,
  '6': 753201987,
  '7': 414380177,
  '8': 392824651,
  '9': 110792606,
  '10': 610875158,
  '11': 708401928,
  '12': 104498188,
  '13': 341683311,
  '14': 524219662,
  '15': 742272618,
  '16': 943972822,
  '17': 2,
  t: 18,
  s: 0 }
 }

 //console.log(JSON.parse(JSON.stringify(a)))


exp.use(bodyParser.urlencoded({ extended: true }))
exp.post('/route', (req, res) => {
  //console.log(req.body)
  if (req.body.name == 'generateKeys') {
    let result = generateKeys(req.body.data)
    //console.log(result)

    let copy = JSON.parse(JSON.stringify(result.rsaKey))
    console.log(result.rsaKey)
    console.log('copy')
    console.log(copy)
  //  let copy2 = JSON.parse(util.inspect(result.rsaKey, {depth: null}).slice(6))
   // let copy2 = JSON.parse(recStringify(result.rsaKey))

    console.log(result.rsaKey)

    res.send({rsaPublic: result.rsaPublic, rsaKey: JSON.stringify(result.rsaKey)})
  }
})

exp.get('/route', (req, res) => {
 //console.log('get')
})
setTimeout(() => {
    exp.listen(port, (err, data) => {
      if (err) console.log('ohh error: ' + err) 
      console.log(`We are live on ${port}`)
    }) 
  }, 
  0
)
  

function generateKeys (passPhrase: string) {
  // bits are now 1024
  const bits = 1024
  const myRSA_key = cryptico.generateRSAKey(passPhrase, bits)
  const myPublic_key = cryptico.publicKeyString(myRSA_key)
  let rsaKey = myRSA_key
  let rsaPublic = myPublic_key
  return { rsaPublic, rsaKey }
}
