const Product = require("../model/product.model");

const buscarTodos = async () => {
    return await Product.find({});
}

const guardarProducto = async (product) => {
    return await Product.create(product);
}

const productRepository = { buscarTodos, guardarProducto };

module.exports = { productRepository };