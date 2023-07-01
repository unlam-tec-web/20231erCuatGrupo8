const { productRepository } = require("../repository/product.repository");

const buscarTodos = () => {
  return productRepository.buscarTodos();
}

const guardarProducto = (product) => {
  return productRepository.guardarProducto(product);
}

const eliminarProducto = (id) => {
  return productRepository.eliminarProducto(id);
}

const obtenerProducto = (id) => {
  return productRepository.buscarProducto(id);
}

const productService = { buscarTodos, guardarProducto, eliminarProducto, obtenerProducto };

module.exports = { productService };
