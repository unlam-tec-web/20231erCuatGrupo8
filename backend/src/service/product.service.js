const { productRepository } = require("../repository/product.repository");

const buscarTodos = async () => {
    return await productRepository.buscarTodos();
}

const productService = { buscarTodos };

module.exports = { productService };