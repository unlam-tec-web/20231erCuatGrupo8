const Product = require("../model/product.model");

const buscarTodos = async () => {
    return await Product.find({});
}

const productRepository = { buscarTodos };

module.exports = { productRepository };