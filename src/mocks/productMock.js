import {faker} from '@faker-js/faker'
import { product } from '../models/product.js'

export function createProductMock(){
  return new product({
    title: faker.commerce.product,
    description: faker.lorem.words(10),
    code: faker.string.alphaNumeric,
    price: faker.number.int,
    stock: faker.number.int,
    category: faker.person.jobArea
  })
}