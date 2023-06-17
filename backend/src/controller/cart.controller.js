const { cartService } = require("../service/cart.service");

const getCart = async (req, res) => {
  try {
    // FIX: paso un id harcodeadeo para matchear un usuario existente de la db
    const ID = "648c9a9c9db6c518c4e892e7"

    // const ID = req.body;
    const CART = await cartService.findById(ID)
    // console.log(CART);
    res.status(200).json(CART);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

const addProduct = async (req, res) => {
  try {
    // FIX: paso un id harcodeadeo para matchear un usuario existente de la db
    const USER_ID = "648c9a9c9db6c518c4e892e7"
    const PRODUCT_ID = req.body.id
    // console.log(PRODUCT_ID)
    // const { userId, productId }  = req.body;

    const PRODUCT = await cartService.addProduct(PRODUCT_ID, USER_ID);

    res.status(200).json(PRODUCT);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = { getCart, addProduct };
