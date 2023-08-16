function irAPag(limit) {
  const pagDeseada = document.querySelector('input').value || 1
  window.location = `/api/products/?limit=${limit}&page=${pagDeseada}`
}

const logout = document.querySelector('#logout')

const cartId = logout.getAttribute('cartId')

const btnCompra = document.querySelectorAll('#btnCompra')
btnCompra.forEach((btn) => {
  btn.addEventListener('click', async event => {
    event.preventDefault()
    const productId = btn.getAttribute('productId')
    try {
      await fetch(`/api/cart/${cartId}/products/${productId}`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
      }).finally(
        Swal.fire({
          title: 'Producto añadido',
          toast: true,
          position: 'top-end',
          background: '#000B49',
          color: '#fff',
          showConfirmButton: false,
          timer: 500,
          iconHtml: '<img src="/imgs/icon.ico" class="toastImg">'
        })
      )
    } catch (error) {
      console.log(error)
    }

  })
})



/* 

const btnCompra = document.querySelectorAll('#btnCompra')
btnCompra.forEach((btn) => {
  btn.addEventListener('click', async event => {
    event.preventDefault()
    const productId = btn.getAttribute('productId')
    //console.log('productId', productId)
    //console.log('cartID', cartID)
    await fetch(`/api/cart/${cartID}/products/${productId}`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    })
    
  })
})

const btnPremium = document.querySelector('#btnPremium')
btnPremium.addEventListener('click', async event => {
  event.preventDefault()
  await fetch('/api/user/premium', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
  })
})

const btnCurrent = document.querySelector('#btnCurrent')
btnCurrent.addEventListener('click', event => {
  event.preventDefault()
  window.location.href = '/api/sessions/current'
}) */