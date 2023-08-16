const formProduct = document.querySelector('#form')
const input_title = document.querySelector('#input_title')
const input_description = document.querySelector('#input_description')
const input_price = document.querySelector('#input_price')
const input_status = document.querySelector('#input_status')
const input_stock = document.querySelector('#input_stock')
const input_thumbnails = document.querySelector('#input_thumbnails')
const input_category = document.querySelector('#input_category')
const owner = document.querySelector('#owner')

let checked = false

if (formProduct instanceof HTMLFormElement) {

  formProduct.addEventListener('submit', async event => {

    event.preventDefault()

    if (
      input_title instanceof HTMLInputElement &&
      input_price instanceof HTMLInputElement &&
      input_status instanceof HTMLInputElement &&
      input_stock instanceof HTMLInputElement &&
      input_thumbnails instanceof HTMLInputElement
    ) {

      if (
        input_title.value.length != 0 &&
        input_description.value.length != 0 &&
        input_price.value.length != 0 &&
        input_stock.value.length != 0) {

        const formData = new FormData()
        const thumbs = []
        if (input_thumbnails.files.length != 0) {
          for (let i = 0; i < input_thumbnails.files.length; i++) {
            let newNamePic = Math.round(Math.random() * 1E9) + '.' + input_thumbnails.files[i].type.split('/')[1]
            thumbs.push(newNamePic)
            formData.append('product', input_thumbnails.files[i], newNamePic)
          }
          formData.append('thumbnails', thumbs)
        }

        const data = {
          title: input_title.value,
          description: input_description.value,
          price: Number(input_price.value),
          status: Boolean(checked),
          stock: Number(input_stock.value),
          owner: owner.textContent,
          category: input_category.value,
          thumbnails: thumbs,
          product: input_thumbnails.files
        }

        try {
          await fetch('/api/product/', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
              "Content-Type": "application/json"
            }
          }).then(
            Swal.fire({
              icon: 'success',
              title: 'Producto añadido con exito',
              showConfirmButton: false,
              timer: 3000
            }),
            setTimeout(
              window.location.href = '/api/products/misProductos'
              , 3000)
          )

          await fetch('/api/product/', {
            method: 'POST',
            body: formData,
          })

        } catch (error) {
          Swal.fire({
            icon: 'error',
            title: 'Oops... algo esta mal',
            text: error
          })
        }

      } else {
        Swal.fire({
          icon: 'warning',
          title: 'No has llenado todos los campos'
        })
      }


    }
  })
}


input_status.addEventListener('change', async event => {
  event.preventDefault()
  if (checked === false) checked = true
  else checked = false
})

//---------------------------------------------------------------------------------------------------
/* 
const form = document.querySelector('#form')
const input_title = document.querySelector('#input_title')
const input_description = document.querySelector('#input_description')
const input_price = document.querySelector('#input_price')
const input_status = document.querySelector('#input_status')
const input_stock = document.querySelector('#input_stock')
const input_thumbnails = document.querySelector('#input_thumbnails')
const input_category = document.querySelector('#input_category')
const owner = document.querySelector('#owner')

let checked = false
if (form instanceof HTMLFormElement) {

  form.addEventListener('submit', async event => {

    event.preventDefault()

    if (
      input_title instanceof HTMLInputElement &&
      input_price instanceof HTMLInputElement &&
      input_status instanceof HTMLInputElement &&
      input_stock instanceof HTMLInputElement &&
      input_thumbnails instanceof HTMLInputElement
    ) {

      if (
        input_title.value.length != 0 &&
        input_description.value.length != 0 &&
        input_price.value.length != 0 &&
        input_stock.value.length != 0) {

        const formData = new FormData()
        formData.append('title', input_title.value)
        formData.append('description', input_description.value)
        formData.append('price', input_price.value)
        formData.append('status', checked)
        formData.append('stock', input_stock.value)
        formData.append('owner', owner.textContent)
        formData.append('category', input_category.value)
        if (input_thumbnails.files.length != 0) {
          const thumbs = []
          for (let i = 0; i < input_thumbnails.files.length; i++) {
            let newNamePic = Math.round(Math.random() * 1E9) + '.' + input_thumbnails.files[i].type.split('/')[1]
            thumbs.push(newNamePic)
            formData.append('product', input_thumbnails.files[i], newNamePic)
          }
          formData.append('thumbnails', thumbs)
        }

        try {
          await fetch('/api/product/', {
            method: 'POST',
            body: formData
          })

        } catch (error) {
          Swal.fire({
            icon: 'error',
            title: 'Oops... algo esta mal',
            text: error
          })
        }

      }

    } else {
      Swal.fire({
        icon: 'warning',
        title: 'No has llenado todos los campos'
      })
    }



  })
}

input_status.addEventListener('change', async event => {
  event.preventDefault()
  if (checked === false) checked = true
  else checked = false
})

 */