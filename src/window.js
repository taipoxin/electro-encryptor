$(() => {
  let rsaPublic
  const port = 3008

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

  let generating = false

  document.getElementById('private_k_btn').onclick = () => {
    if (generating) return
    const text = PassPhraseInput.value
    console.log(text)
    PassPhraseInput.value = ''
    generating = true
    $.ajax({
      type: 'POST',
      url: `http://localhost:${port}/route`,
      data: { name: 'generateKeys', data: text },
      timeout: 10000,
      success: (data) => {
        console.log(data)
        rsaPublic = data.rsaPublic
        publicKey.innerHTML = rsaPublic
        generating = false
      },
      error: (error) => {
        generating = false
        console.log(error)
      }
    })
  }

  document.getElementById('encrypt_btn').onclick = () => {
    console.log('------------- ENCRYPT --------------')
    const pKey = anotherPublicKey.value
    const text = myText.value
    if (pKey === '' || text === '') return

    $.ajax({
      type: 'POST',
      url: `http://localhost:${port}/route`,
      data: { name: 'encrypt', data: { text, pKey } },
      timeout: 10000,
      success: (data) => {
        console.log(data)
        outText.innerHTML = data.cipher
        console.log(data.cipher)
        myText.value = ''
      },
      error: (error) => {
        console.log(error)
      }
    })
  }

  let setted = false

  document.getElementById('decrypt_btn').onclick = () => {
    console.log('------------- DECRYPT --------------')
    const text = encText.value
    console.log(`encrypted another text: ${text}`)
    if (text === '') return
    if (setted) return
    const t1 = setInterval(() => {
      console.log('client send')
      setted = true
      $.ajax({
        type: 'POST',
        url: `http://localhost:${port}/route`,
        data: { name: 'decrypt', data: { text } },
        timeout: 15000,
        success: (data) => {
          console.log(data)
          decOutput.innerHTML = data.utfPlainText
          console.log(data.utfPlainText)
          encText.value = ''
          clearInterval(t1)
          setted = false
        },
        error: (error) => {
          setted = false
          console.log(error)
        }
      })
    }, 50)
  }

  $('#text-input').focus() // focus input box
})
