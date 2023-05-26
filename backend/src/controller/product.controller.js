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

module.exports = { buscarTodos };