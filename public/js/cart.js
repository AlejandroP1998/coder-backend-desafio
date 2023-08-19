const deletebtn = document.querySelectorAll('#deleteBtn')
const orden = document.querySelector('#makeShop')
const carrito = orden.getAttribute('cart')
const makeShop = document.querySelector('#makeShop')

deletebtn.forEach(btn => btn.addEventListener('click', async event=>{
  event.preventDefault()
  const producto = btn.getAttribute('prod')
  await fetch(`/api/cart/${carrito}/products/${producto}`,{
    method: 'DELETE'
  }).then(
    Swal.fire({
      title:'Producto eliminado del carrito!',
      icon:"success",
      showConfirmButton : false,
      timer: 1000 
    }),
    setTimeout(()=>{
      location.reload()
    },1000)
  )
} ))

makeShop.addEventListener('click', async event => {
  event.preventDefault()
  try {
    await fetch('/api/ticket/',
    {
      method: 'POST'
    }
    ).then(
      Swal.fire({
        icon: 'success',
        title: 'Compra realizada',
        showConfirmButton: false,
        timer: 6000
      }),
      setTimeout(
        window.location.href = '/api/products/'
        , 6000)
    )
  } catch (error) {
    
  }
})