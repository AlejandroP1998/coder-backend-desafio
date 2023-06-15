function irAPag(limit) {
  const pagDeseada = document.querySelector('input').value || 1
  window.location = `/api/products/?limit=${limit}&page=${pagDeseada}`
}

const btnLO = document.querySelector('#btnLO')
btnLO.addEventListener('click', async event => {
  event.preventDefault()
  window.location.href = '/api/logout'
})

const btnCompra = document.querySelector('#btnCompra')
btnCompra.addEventListener('click', async event => {
  event.preventDefault()
})