const formLogin = document.querySelector('#formRegister')

if (formLogin instanceof HTMLFormElement) {

  formLogin.addEventListener('submit', async event => {

    event.preventDefault()

    const input_first_name = document.querySelector('#input_first_name')
    const input_last_name = document.querySelector('#input_last_name')
    const input_email = document.querySelector('#input_email')
    const input_age = document.querySelector('#input_age')
    const input_password = document.querySelector('#input_password')
    if (
      input_first_name instanceof HTMLInputElement &&
      input_last_name instanceof HTMLInputElement &&
      input_email instanceof HTMLInputElement &&
      input_age instanceof HTMLInputElement &&
      input_password instanceof HTMLInputElement
    ) {
      const datosUsuario = {
        first_name: input_first_name.value,
        last_name: input_last_name.value,
        email: input_email.value,
        age: input_age.value,
        password: input_password.value
      }

      await fetch('/api/register/', {
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

const btnL = document.querySelector('#btnL')
btnL.addEventListener('click', async event => {
  event.preventDefault()
  window.location.href = '/api/login/'
})