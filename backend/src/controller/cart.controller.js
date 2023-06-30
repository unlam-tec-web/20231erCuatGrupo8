const { cartService } = require("../service/cart.service");

const getCart = async (req, res) => {
  try {
    const ID = req.query.cart;
    const CART = await cartService.findById(ID)
    res.status(200).json(CART);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

const addProduct = async (req, res) => {
  try {
    const USER_ID = req.body.userId
    const PRODUCT_ID = req.body.id

    const PRODUCT = await cartService.addProduct(PRODUCT_ID, USER_ID);

    res.status(200).json(PRODUCT);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

const removeProduct = async (req, res) => {
  try {
    const PRODUCT_ID = req.body.id
    const USER_ID = req.body.userId

    const PRODUCT = await cartService.removeProduct(PRODUCT_ID, USER_ID);

    res.status(200).json(PRODUCT);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

const clear = async (req, res) => {
  try {
    // FIX: paso un id harcodeadeo para matchear un usuario existente de la db
    const USER_ID = req.body.id
    const CART = await cartService.clear(USER_ID)

    res.status(200).json(CART);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = { getCart, addProduct, removeProduct, clear };
