
$(() => {
  const cryptico = require('cryptico')
  const aes = require('../lib/aes')

  let rsaKey
  let rsaPublic

  // generating
  const PassPhraseInput = document.getElementById('pass_input')
  const publicKey = document.getElementById('public_key_output')
  // encrypting
  const anotherPublicKey = document.getElementById('public_key')
  const myText = document.getElementById('text_for_encrypting')
  const outText = document.getElementById('encrypted_text_output')
  // decrypting
  const encText = document.getElementById('text_for_decrypting')
  const decOutput = document.getElementById('decrypted_text_output')

  function generateKeys (passPhrase: string) {
    // bits are now 1024
    const bits = 1024
    const myRSA_key = cryptico.generateRSAKey(passPhrase, bits)
    const myPublic_key = cryptico.publicKeyString(myRSA_key)
    rsaKey = myRSA_key
    rsaPublic = myPublic_key
    return rsaPublic
  }

  document.getElementById('private_k_btn').onclick = () => {
    const text = PassPhraseInput.value
    console.log(text)
    PassPhraseInput.value = ''

    const publicK = generateKeys(text)
    console.log(publicK)
    publicKey.innerHTML = publicK

    /* for tests
    let s = '';
    for (let i = 1040; i < 1104; i++) {
      s+= String.fromCharCode(i);
    }
    myText.value = s;
    */
  }

  document.getElementById('encrypt_btn').onclick = () => {
    console.log('------------- ENCRYPT --------------')
    const pKey = anotherPublicKey.value
    let text = myText.value
    if (pKey === '' || text === '') return

    text = aes.encryptToHex(text)

    const encryptedObj = cryptico.encrypt(text, pKey)
    outText.innerHTML = encryptedObj.cipher
    console.log(text)
    myText.value = ''
  }

  document.getElementById('decrypt_btn').onclick = () => {
    console.log('------------- DECRYPT --------------')
    const text = encText.value
    if (text === '') return

    const decrypted = cryptico.decrypt(text, rsaKey)

    let txt = decrypted.plaintext

    txt = aes.decryptToUTF(txt)

    decOutput.innerHTML = txt
    console.log(txt)
    encText.value = ''
  }

  $('#text-input').focus() // focus input box
})
