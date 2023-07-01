const { cartService } = require("../service/cart.service");

const getCart = (req, res) => {
    cartService.findById(req.query.cart)
    .then(resp => res.status(200).json(resp))
    .catch (error => {
    res.status(500).json({ error: error.message });
  })
}

const addProduct = (req, res) => {
    const USER_ID = req.body.userId
    const PRODUCT_ID = req.body.id
    cartService.addProduct(PRODUCT_ID, USER_ID)
    .then(resp => res.status(200).json(resp))
    .catch (error => {
      res.status(500).json({ error: error.message });
  })
}

const removeProduct = (req, res) => {
    const PRODUCT_ID = req.body.id
    const USER_ID = req.body.userId
    cartService.removeProduct(PRODUCT_ID, USER_ID)
    .then(resp => res.status(200).json(resp))
    .catch (error => {
      res.status(500).json({ error: error.message });
  })
}

const clear = (req, res) => {
    cartService.clear(req.body.id)
    .then(resp => res.status(200).json(resp))
    .catch (error => {
      res.status(500).json({ error: error.message });
  })
}

module.exports = { getCart, addProduct, removeProduct, clear };
