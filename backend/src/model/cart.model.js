const mongoose = require('mongoose');

const shoppingCartSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  products: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product"
    }
  ]
});

const ShoppingCart = new mongoose.model("ShoppingCart", shoppingCartSchema);

module.exports = ShoppingCart;
