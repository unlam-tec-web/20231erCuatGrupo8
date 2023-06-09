const { productService } = require("../service/product.service");

const buscarTodos = async (req, res) => {
    try {
        const products = await productService.buscarTodos();
        console.log(products);
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const agregarProducto = async (req, res) => {
    try {
        await productService.guardarProducto(req.body);
        console.log(product);
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = { buscarTodos, agregarProducto };