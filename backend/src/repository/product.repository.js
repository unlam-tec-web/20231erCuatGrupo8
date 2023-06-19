const Product = require("../model/product.model");

const buscarTodos = async () => {
  return await Product.find({});
}

const buscarProducto = async (id) => {
  return await Product.findById(id);
}

const guardarProducto = async (product) => {
  return await Product.create(product);
}

const eliminarProducto = async (id) => {
  await Product.findById(id); // busco el producto
  await Product.findOneAndRemove({ _id: id }) // elimino el producto
}

const productRepository = { buscarTodos, buscarProducto, guardarProducto, eliminarProducto };

module.exports = { productRepository };
