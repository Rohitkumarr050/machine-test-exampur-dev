const mongoose = require('mongoose')

const productSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        price: { type: String, required: true },
        stock: { type: Number, required: true },
        description: { type: String, required: true },
        category:{ type: String, required:true },
        thumbnail:{ type: String },
        isDeleted: { type: Boolean, default: false },
    },
    { timestamps: true }
    )

module.exports = mongoose.model('product', productSchema)
