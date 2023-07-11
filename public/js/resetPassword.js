const formReset = document.querySelector('#formReset')

if (formReset instanceof HTMLFormElement) {

  formReset.addEventListener('submit', async event => {

    event.preventDefault()

    const input_password = document.querySelector('#input_password')
    const input_email = document.querySelector('#input_email')
    if (
      input_password instanceof HTMLInputElement,
      input_email instanceof HTMLInputElement
    ) {
      const datosUsuario = {
        email: input_email.value,
        password: input_password.value
      }

      await fetch('/api/user/', {
        method: 'PUT',
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