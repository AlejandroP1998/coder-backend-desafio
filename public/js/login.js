const formLogin = document.querySelector('#formLogin')
const input_email = document.querySelector('#input_email')
const input_password = document.querySelector('#input_password')

if (formLogin instanceof HTMLFormElement) {

  formLogin.addEventListener('submit', async event => {

    event.preventDefault()

    if (
      input_email instanceof HTMLInputElement &&
      input_password instanceof HTMLInputElement
    ) {
      if (input_email.value.length != 0 && input_password.value.length != 0) {

        const datosUsuario = {
          email: input_email.value,
          password: input_password.value
        }

        let encontrado = false

        try {
          await fetch('/api/login/', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(datosUsuario)
          }).then(res => res.json(datosUsuario))
          encontrado = true
        } catch (error) {
          Swal.fire({
            icon: 'error',
            title: 'Oops... algo esta mal',
            text: 'Revisa que el email y contraseña sean correctos'
          })
        }

        encontrado ? window.location.href = '/api/products/' : null

      } else {
        Swal.fire({
          icon: 'warning',
          title: 'No has llenado todos los campos'
        })
      }
    }
  })
}

const btnR = document.querySelector('#btnR')
btnR.addEventListener('click', async event => {
  event.preventDefault()
  window.location.href = '/api/register/'
})

const btnReset = document.querySelector('#btnReset')
btnReset.addEventListener('click', async event => {
  event.preventDefault()
  window.location.href = '/api/account/password/request'
})

const input_checkbox = document.querySelector('#showP')
const label_input_checkbox = document.querySelector('#lshowP')
input_checkbox.addEventListener('change', async event => {
  if (input_password.type == 'password') {
    input_password.type = 'text'
    label_input_checkbox.textContent = 'Ocultar contraseña'
  } else {
    input_password.type = 'password'
    label_input_checkbox.textContent = 'Mostrar contraseña'
  }
})