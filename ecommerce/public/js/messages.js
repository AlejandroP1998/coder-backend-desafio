const form = document.querySelector('#messages-form')

if (form instanceof HTMLFormElement) {
  form.addEventListener('submit', event => {
    event.preventDefault()
    const formData = new FormData(form)
    const data = {}
    formData.forEach((value,key) => (data[key] = value))
    
    fetch('/api/messages',{
      method:'POST',
      body: JSON.stringify(data),
      headers:{
        'Content-Type':'application/json'
      }
    })
  })
}