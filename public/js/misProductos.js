const btnDelete = document.querySelectorAll('#btnDelete')
btnDelete.forEach(btn => btn.addEventListener('click', async event => {
  event.preventDefault()
  const productId = btn.getAttribute('productId')
  
  try {
    await fetch(`/api/product/${productId}`, {
      method: 'DELETE'
    }).finally(
      Swal.fire({
        title: 'Producto eliminado',
        toast: true,
        position: 'top-end',
        background: '#990000',
        color: '#fff',
        showConfirmButton: false,
        timer: 500,
        iconHtml: '<img src="/imgs/icon.ico" class="toastImg">'
      }),
      setTimeout(function () {
        location.reload();
      }, 1000)
    )
  } catch (error) {
    
  }
}))