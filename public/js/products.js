function irAPag(limit) {
  const pagDeseada = document.querySelector('input').value || 1
  window.location = `/api/products/?limit=${limit}&page=${pagDeseada}`
}


/* let cartID
const btnLO = document.querySelector('#btnLO')
cartID = btnLO.getAttribute('cartId')

btnLO.addEventListener('click', async event => {
  event.preventDefault()
  window.location.href = '/api/logout'
})

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