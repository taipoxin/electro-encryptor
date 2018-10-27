// @flow

const cryptico = require('cryptico')
const util = require('util')
const express = require('express')
const bodyParser = require('body-parser')
const aes = require('./aes')

const port = 3008
const exp = express()

let rsaKey: Object
let rsaPublic

function generateKeys (passPhrase: string): Object {
  // bits are now 1024
  const bits = 1024
  const myRSA_key = cryptico.generateRSAKey(passPhrase, bits)
  const myPublic_key = cryptico.publicKeyString(myRSA_key)
  return { myPublic_key, myRSA_key }
}

let setted = false

exp.use(bodyParser.urlencoded({ extended: true }))

exp.post('/route', (req, res: express$Response) => {
  const { data } = req.body
  switch (req.body.name) {
    case 'generateKeys':
      const result: Object = generateKeys(data)
      rsaKey = result.myRSA_key
      rsaPublic = result.myPublic_key
      // console.log(result)
      res.send({ rsaPublic })
      break

    case 'encrypt':
      const text: string = aes.encryptToHex(data.text)
      const encryptedObj: Object = cryptico.encrypt(text, data.pKey)
      console.log(encryptedObj)
      res.send({ cipher: encryptedObj.cipher })
      break

    case 'decrypt':
      if (setted) return
      const t1 = setInterval(() => {
        try {
          setted = true
          const decrypted = cryptico.decrypt(data.text, rsaKey)
          // console.log(decrypted)
          const txt = aes.decryptToUTF(decrypted.plaintext)
          res.send({ utfPlainText: txt })
          console.log('sended response with decryption')
          console.log(txt)
          clearInterval(t1)
          setted = false
        } catch (err) {}
      }, 50)

      break

    default:
      console.log(`unexpected request${req.toString()}`)
      break
  }
})

exp.get('/route', (req, res: express$Response) => {
  // console.log('get')
})

exp.listen(port, (err: ?Error, data) => {
  if (err) console.log(`ohh error: ${err.toString()}`)
  console.log(`We are live on ${port}`)
})
