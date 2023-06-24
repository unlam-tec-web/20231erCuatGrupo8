const { productService } = require("../service/product.service");

const buscarTodos = async (req, res) => {
  try {
    const PRODUCTS = await productService.buscarTodos();
    // console.log(PRODUCTS);
    res.status(200).json(PRODUCTS);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

const agregarProducto = async (req, res) => {
  try {
    const PRODUCT = req.body;
    await productService.guardarProducto(PRODUCT);
    // console.log(PRODUCT);
    res.status(200).json(PRODUCT);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

const eliminarProducto = async (req, res) => {
  try {
    const ID = req.params.id;
    await productService.eliminarProducto(ID);
    res.status(200).json("hecho");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

const obtenerProducto = async (req, res) => {
  try {
    const ID = req.params.id;
    PRODUCT = await productService.obtenerProducto(ID);
    res.status(200).json(PRODUCT);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = { buscarTodos, agregarProducto, eliminarProducto, obtenerProducto };
