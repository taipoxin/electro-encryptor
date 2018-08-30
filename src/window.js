// @flow
$(() => {
  const cryptico = require('cryptico');

  let rsaKey;
  let rsaPublic;

  // generating
  const PassPhraseInput = document.getElementById('pass_input');
  const publicKey = document.getElementById('public_key_output');
  // encrypting
  const anotherPublicKey = document.getElementById('public_key');
  const myText = document.getElementById('text_for_encrypting');
  const outText = document.getElementById('encrypted_text_output');
  // decrypting
  const encText = document.getElementById('text_for_decrypting');
  const decOutput = document.getElementById('decrypted_text_output');


  function generateKeys (passPhrase : string) {
    // bits are now 1024
    let bits = 1024;
    let myRSA_key = cryptico.generateRSAKey(passPhrase, bits);
    let myPublic_key = cryptico.publicKeyString(myRSA_key);
    rsaKey = myRSA_key;
    rsaPublic = myPublic_key;
    return rsaPublic;
  }

  document.getElementById('private_k_btn').onclick = () => {
    const text = PassPhraseInput.value;
    console.log(text);
    PassPhraseInput.value = '';

    let publicK = generateKeys(text);
    console.log(publicK);
    publicKey.innerHTML = publicK;
  };


  document.getElementById('encrypt_btn').onclick = () => {
    let pKey = anotherPublicKey.value;
    let text = myText.value;
    if (pKey === '' || text === '') return;
    let encryptedObj = cryptico.encrypt(text, pKey);
    outText.innerHTML = encryptedObj.cipher;
    console.log(text);
    myText.value = '';
  };

  document.getElementById('decrypt_btn').onclick = () => {
    let text = encText.value;
    if (text === '') return;
    let decrypted = cryptico.decrypt(text, rsaKey);

    decOutput.innerHTML = decrypted.plaintext;
    console.log(decrypted.plaintext);
    encText.value = '';
  };

  $('#text-input').focus() // focus input box
});
