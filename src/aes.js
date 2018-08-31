const aesjs = require('aes-js');


// return hex string
function encryptToHex(str) {
  let key_128 = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
  let aesCtr = new aesjs.ModeOfOperation.ctr(key_128);
  let txt = aesjs.utils.utf8.toBytes(str);
  let encryptedBytes = aesCtr.encrypt(txt);
  return aesjs.utils.hex.fromBytes(encryptedBytes);
}

// return UTF string
function decryptToUTF(str) {
  let key_128 = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
  let aesCtr = new aesjs.ModeOfOperation.ctr(key_128);
  let bytes = aesjs.utils.hex.toBytes(str);
  let decryptedBytes = aesCtr.decrypt(bytes);
  return aesjs.utils.utf8.fromBytes(decryptedBytes);
}

module.exports = {encryptToHex, decryptToUTF};
