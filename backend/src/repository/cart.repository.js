const ShoppingCart = require('../model/cart.model');

const findById = async (id) => {
  return await ShoppingCart.findOne({ user: { _id: id } }, { user: 0 })
    .populate("products");
}

const create = async (cart) => {
  return await ShoppingCart.create(cart);
}

const update = async (cart) => {
  return await ShoppingCart.findByIdAndUpdate(cart._id,
    cart
  );
}

const cartRepository = { findById, create, update };

module.exports = { cartRepository };

