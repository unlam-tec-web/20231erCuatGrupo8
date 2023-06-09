const Product = require("../model/product.model");

const buscarTodos = async () => {
    return await Product.find({});
}

const guardarProducto = async (product) => {
    return await Product.create(product);
}

const eliminarProducto = async (id) => {
    await Product.findById(id); // busco el producto
    await Product.findOneAndRemove({ _id: id }) // elimino el producto
}

const productRepository = { buscarTodos, guardarProducto, eliminarProducto };

module.exports = { productRepository };