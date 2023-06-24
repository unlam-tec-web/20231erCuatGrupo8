const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
    {
        img: {
            type: String,
            required: false
        },
        name: {
            type: String,
            required: false
        },
        description: {
            type: String,
            required: false
        },
        category: {
            type: String,
            required: false
        },
        price: {
            type: Number,
            required: false
        }
    }
)

const Product = new mongoose.model("Product", productSchema);

module.exports = Product;