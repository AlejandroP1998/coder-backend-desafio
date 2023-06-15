export function stringValido(valor, nombreCampo){
  if(typeof valor !== 'string'){
    throw new Error('el campo '+ nombreCampo+' no puede llevar numeros ni caracteres especiales')
  }else{
    return valor
  }
}

export function validarEnteroPositivo(valor, nombreCampo) {
  if (typeof valor !== 'number')
    throw new Error(`el campo ${nombreCampo} debe ser un numero`)
  if (!Number.isInteger(Number(valor)))
    throw new Error(`el campo ${nombreCampo} debe un numero entero`)
  if (Number(valor) <= 0)
    throw new Error(`el campo ${nombreCampo} debe ser un numero positivo mayor a cero`)
  return Number(valor)
}