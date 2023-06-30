const { cartRepository } = require('../repository/cart.repository');
const { productRepository } = require('../repository/product.repository');
const ShoppingCart = require('../model/cart.model');
const User = require('../model/user.model');
const { Error } = require('mongoose');

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
  console.log("1")
  const cart = await cartRepository.findById(userId);
  console.log("2")
  const product = await productRepository.buscarProducto(productId);
  console.log("3")
  console.log("cart -> ", cart)
  console.log("product -> ", product)
  if (!cart) {
    cart = createCart(userId)
  }

  if (!product) {
    throw new Error("Carrito o producto inválido");
  }
  console.log("Paso por aca")
  if (alreadyInCart(cart, productId)) {
    throw new Error("Ya tenés ese producto en el carrito");
  }

  cart.products = [...cart.products, product]

  await cartRepository.update(cart);
  console.log("antes del return")
  return product
}

const removeProduct = async (productId, userId) => {
  // TODO: IDEM lógica para determinar que el carrito es del usuario logueado

  const cart = await cartRepository.findById(userId);
  const product = await productRepository.buscarProducto(productId);

  if (!cart || !product) {
    throw new Error("Carrito o producto inválido");
  }

  if (!alreadyInCart(cart, productId)) {
    throw new Error("No tenés ese vehículo");
  }

  cart.products = [...cart.products.filter(p => p._id != productId)]

  await cartRepository.update(cart);
  return product
}

const clear = async (userId) => {
  // TODO: IDEM lógica para determinar que el carrito es del usuario logueado
  // o no te lo dejo limpiar
  const cart = await cartRepository.findById(userId);

  if (!cart) {
    throw new Error("Carrito inválido");
  }
  cart.products = []

  await cartRepository.update(cart);
  return cart
}

// ----------------------------------------------------------------------------
// Métodos private/helpers para el servicio
// ----------------------------------------------------------------------------

const createCart = async (userId) => {
  // TODO: hay que crear un método en el repositorio para buscar el user por id

  const user = await User.findById(userId);
  const cart = new ShoppingCart({ user: user });

  return await cartRepository.create(cart);
}

const alreadyInCart = (cart, productId) => cart.products.filter(p => p._id == productId).length > 0;

// ----------------------------------------------------------------------------

const cartService = { findById, addProduct, removeProduct, clear };

module.exports = { cartService };
