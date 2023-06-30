const ShoppingCart = require("../model/cart.model");

const findById = (email) => {
  return ShoppingCart.findOne({ email: email }).populate("products");
};

const create = (cart) => {
  return ShoppingCart.create(cart);
};

const update = (cart) => {
  return ShoppingCart.findByIdAndUpdate(cart._id, cart);
};

const cartRepository = { findById, create, update };

module.exports = { cartRepository };
