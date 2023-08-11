const formLogin = document.querySelector('#formRegister')
const input_first_name = document.querySelector('#input_first_name')
const input_last_name = document.querySelector('#input_last_name')
const input_email = document.querySelector('#input_email')
const input_age = document.querySelector('#input_age')
const input_password = document.querySelector('#input_password')


const profilePic = document.querySelector('#input_file')
const profileImg = document.querySelector('#picProfile')
let imgCodified
let newNamePic
profilePic.addEventListener('change', async event => {
  event.preventDefault()
  const file = profilePic.files[0]
  //console.log('file', file)

  newNamePic = Math.round(Math.random() * 1E9) + '-profilePic.' + file.type.split('/')[1]
  imgCodified = URL.createObjectURL(file)
  profileImg.src = imgCodified
})

if (formLogin instanceof HTMLFormElement) {

  formLogin.addEventListener('submit', async event => {

    event.preventDefault()

    if (
      input_first_name instanceof HTMLInputElement &&
      input_last_name instanceof HTMLInputElement &&
      input_email instanceof HTMLInputElement &&
      input_age instanceof HTMLInputElement &&
      input_password instanceof HTMLInputElement &&
      profilePic instanceof HTMLElement
    ) {

      if (
        input_first_name.value.length != 0 &&
        input_last_name.value.length != 0 &&
        input_email.value.length != 0 &&
        input_age.value.length != 0 &&
        input_password.value.length != 0) {

        const formData = new FormData()
        formData.append('first_name', input_first_name.value)
        formData.append('last_name', input_last_name.value)
        formData.append('email', input_email.value)
        formData.append('age', input_age.value)
        formData.append('password', input_password.value)
        if (profilePic.files[0]) {
          formData.append('documents', JSON.stringify({
            name: 'profile picture',
            reference: newNamePic
          }))
          formData.append('profile', profilePic.files[0], newNamePic)
        }

        let encontrado = false
        try {
          await fetch('/api/register/', {
            method: 'POST',
            body: formData
          }).then(res => res.json(formData))

          encontrado = true

          
        } catch (error) {
          Swal.fire({
            icon: 'error',
            title: 'Oops... algo esta mal',
            text: 'Revisa que todos los campos sean correctos'
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

const btnL = document.querySelector('#btnL')
btnL.addEventListener('click', async event => {
  event.preventDefault()
  window.location.href = '/api/login/'
})

const input_checkbox = document.querySelector('#check')
const label_input_checkbox = document.querySelector('#lcheck')
input_checkbox.addEventListener('change', async event => {
  event.preventDefault()
  if (input_password.type == 'password') {
    input_password.type = 'text'
    label_input_checkbox.textContent = 'Ocultar contraseña'
  } else {
    input_password.type = 'password'
    label_input_checkbox.textContent = 'Mostrar contraseña'
  }
})

