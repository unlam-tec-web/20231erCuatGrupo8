const { productRepository } = require("../repository/product.repository");

const buscarTodos = async () => {
  return await productRepository.buscarTodos();
}

const guardarProducto = async (product) => {
  //validaciones
  return await productRepository.guardarProducto(product);
}

const eliminarProducto = async (id) => {
  return await productRepository.eliminarProducto(id);
}

const obtenerProducto = async (id) => {
  return await productRepository.buscarProducto(id);
}

const productService = { buscarTodos, guardarProducto, eliminarProducto, obtenerProducto };

module.exports = { productService };
