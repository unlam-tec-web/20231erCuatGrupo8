const { cartRepository } = require('../repository/cart.repository');
const { productRepository } = require('../repository/product.repository');
const ShoppingCart = require('../model/cart.model');
const User = require('../model/user.model');
const { Error } = require('mongoose');

const findById = async (id) => {
  const cart = await cartRepository.findById(id)

  // Si no existe el carrito lo creamos
  if (!cart) {
    return await createCart(id)
  }

  return cart;
}

// Agregar al carrito
const addProduct = async (productId, userId) => {
  const cart = await findById(userId);
  const product = await productRepository.buscarProducto(productId);

  if (!cart || !product) {
    throw new Error("Carrito o producto inválido");
  }

  if (alreadyInCart(cart, productId)) {
    throw new Error("Ya tenés ese producto en el carrito");
  }

  cart.products = [...cart.products, product]

  await cartRepository.update(cart);
  return product
}

const removeProduct = async (productId, userId) => {
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
  const cart = new ShoppingCart({ email: userId });
  return await cartRepository.create(cart);
}

const alreadyInCart = (cart, productId) => cart.products.filter(p => p._id == productId).length > 0;

// ----------------------------------------------------------------------------

const cartService = { findById, addProduct, removeProduct, clear };

module.exports = { cartService };
