const express = require("express");
const router = express.Router();

const productController = require("../controller/product.controller");

router.get("/", productController.buscarTodos);
router.post("/crear", productController.agregarProducto);
router.delete("/eliminar/:id", productController.eliminarProducto);

module.exports = router;