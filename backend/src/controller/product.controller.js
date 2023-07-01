const { productService } = require("../service/product.service");

const buscarTodos = (req, res) => {
  productService.buscarTodos()
    .then(products => {
      res.status(200).json(products)
    })
    .catch(error => {
      res.status(500).json({ error: error.message });
    })
}

const agregarProducto = (req, res) => {
  productService.guardarProducto(req.body)
    .then(producto => {
      res.status(200).json(producto);
    })
    .catch(error => {
      res.status(500).json({ error: error.message });
    })
}

const eliminarProducto = (req, res) => {
  const ID = req.params.id;
  productService.eliminarProducto(ID)
    .then(resp => res.status(200).json("hecho"))
    .catch(error => {
      res.status(500).json({ error: error.message });
    })
}

const obtenerProducto = (req, res) => {
  const ID = req.params.id;
  productService.obtenerProducto(ID)
    .then(producto => res.status(200).json(producto))
    .catch(error => {
      res.status(500).json({ error: error.message });
    })
}

module.exports = { buscarTodos, agregarProducto, eliminarProducto, obtenerProducto };
