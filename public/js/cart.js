const deletebtn = document.querySelectorAll('#deleteBtn')
const orden = document.querySelector('#makeShop')
const carrito = orden.getAttribute('cart')

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