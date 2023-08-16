export function stringValido(valor, nombreCampo){
  if(typeof valor !== 'string'){
    throw new Error('el campo '+ nombreCampo+' no puede llevar numeros ni caracteres especiales')
  }else{
    return valor
  }
}

export function validarEnteroPositivo(valor, nombreCampo) {

  const numero = parseInt(valor);

  if (typeof numero !== 'number')
    throw new Error(`el campo ${nombreCampo} debe ser un numero`)
  if (!Number.isInteger(Number(numero)))
    throw new Error(`el campo ${nombreCampo} debe un numero entero`)
  if (Number(numero) <= 0)
    throw new Error(`el campo ${nombreCampo} debe ser un numero positivo mayor a cero`)
  return Number(numero)
}