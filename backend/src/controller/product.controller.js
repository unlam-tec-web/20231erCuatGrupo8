const { productService } = require("../service/product.service");

const buscarTodos = async (req, res) => {
    try {
        const PRODUCTS = await productService.buscarTodos();
        console.log(PRODUCTS);
        res.status(200).json(PRODUCTS);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const agregarProducto = async (req, res) => {
    try {
        const PRODUCT = req.body;
        await productService.guardarProducto(PRODUCT);
        console.log(PRODUCT);
        res.status(200).json(PRODUCT);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = { buscarTodos, agregarProducto };