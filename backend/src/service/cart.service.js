const { cartRepository } = require('../repository/cart.repository');
const { productRepository } = require('../repository/product.repository');
const ShoppingCart = require('../model/cart.model');
const User = require('../model/user.model');

const findById = async (id) => {
  // TODO: Lógica para validar que el usuario que está queriendo ver el carrito sea
  // el de él mismo
  // if (id !== user._id) {
  //   throw new Error("No estás autorizado");
  // }

  const cart = await cartRepository.findById(id)

  // Si no existe el carrito lo creamos
  if (!cart) {
    return await createCart(id)
  }

  return cart;
}

// Agregar al carrito
const addProduct = async (productId, userId) => {
  // TODO: IDEM lógica para determinar que el carrito es del usuario logueado
  // o no te lo dejo agregar

  const cart = await cartRepository.findById(userId);
  // console.log("Carrito: ", cart)
  const product = await productRepository.buscarProducto(productId);
  // console.log("Producto: ", product)

  if (!cart || !product) {
    throw new Error("Carrito o producto inválido");
  }

  await cartRepository.update(cart, product);
  return product
}

// Método "Private" para crear el carrito por primera vez. Ver si hay alguna otra
// forma de hacerlo
// Tal vez sea mejor crearselo directamente cuando registramos al usuario y
// asignarle un carrito vacío
const createCart = async (userId) => {
  // TODO: hay que crear un método en el repositorio para buscar el user por id

  const user = await User.findById(userId);
  const cart = new ShoppingCart({ user: user });

  return await cartRepository.create(cart);
}

// TODO:
// Quitar producto del carrito
// Limpiar el carrito

const cartService = { findById, addProduct };

module.exports = { cartService };
