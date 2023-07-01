const Product = require("../model/product.model");

const buscarTodos = () => {
  return Product.find({});
}

const buscarProducto = (id) => {
  return Product.findById(id);
}

const guardarProducto = (product) => {
  return Product.create(product);
}

const eliminarProducto = (id) => {
  Product.findById(id); // busco el producto
  return  Product.findOneAndRemove({ _id: id }) // elimino el producto
}

const productRepository = { buscarTodos, buscarProducto, guardarProducto, eliminarProducto };

module.exports = { productRepository };
