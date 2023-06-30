const mongoose = require('mongoose');

const shoppingCartSchema = mongoose.Schema({
  email: {
    type: String,
    required: false
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
