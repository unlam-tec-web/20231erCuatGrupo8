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

const productService = { buscarTodos, guardarProducto, eliminarProducto };

module.exports = { productService };