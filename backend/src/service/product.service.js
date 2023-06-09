const { productRepository } = require("../repository/product.repository");

const buscarTodos = async () => {
    return await productRepository.buscarTodos();
}

const guardarProducto = async (product) => {
    //validaciones
    return await productRepository.guardarProducto(product);
}

const productService = { buscarTodos, guardarProducto };

module.exports = { productService };