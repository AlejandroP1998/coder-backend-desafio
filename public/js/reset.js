const formReset = document.querySelector('#formReset')

if (formReset instanceof HTMLFormElement) {

  formReset.addEventListener('submit', async event => {

    event.preventDefault()

    const input_email = document.querySelector('#input_email')
    if (
      input_email instanceof HTMLInputElement
    ) {
      const datosUsuario = {
        email: input_email.value
      }

      await fetch('/api/account/password/reset/', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(datosUsuario)
      }).then(res => res.json())

      window.location.href = '/api/products/'

    }
  })
}