const aesjs = require('aes-js')

// return hex string
function encryptToHex (str) {
  const key_128 = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]
  const aesCtr = new aesjs.ModeOfOperation.ctr(key_128)
  const txt = aesjs.utils.utf8.toBytes(str)
  const encryptedBytes = aesCtr.encrypt(txt)
  return aesjs.utils.hex.fromBytes(encryptedBytes)
}

// return UTF string
function decryptToUTF (str) {
  const key_128 = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]
  const aesCtr = new aesjs.ModeOfOperation.ctr(key_128)
  const bytes = aesjs.utils.hex.toBytes(str)
  const decryptedBytes = aesCtr.decrypt(bytes)
  return aesjs.utils.utf8.fromBytes(decryptedBytes)
}

module.exports = { encryptToHex, decryptToUTF }
