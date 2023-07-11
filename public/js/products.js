function irAPag(limit) {
  const pagDeseada = document.querySelector('input').value || 1
  window.location = `/api/products/?limit=${limit}&page=${pagDeseada}`
}


let cartID
const btnLO = document.querySelector('#btnLO')
cartID = btnLO.getAttribute('cartId')

btnLO.addEventListener('click', async event => {
  event.preventDefault()
  window.location.href = '/api/logout'
})

const btnCompra = document.querySelectorAll('#btnCompra')
btnCompra.forEach((btn) => {
  btn.addEventListener('click', async event => {
    Swal.fire(
      'Good job!',
      'You clicked the button!',
      'success'
    )
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
    }).then(res => res.json())
    
  })
})