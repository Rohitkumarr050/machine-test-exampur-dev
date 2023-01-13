const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.ObjectId

const walletSchema = new mongoose.Schema(
    {
        // userId: {type: ObjectId,  ref: "user"} ,
        userName: { type: String},
        balance: { type: String, required: true },
        status: { type: String, enum: ["active", "inactive"], default: "active" },
        createdAt: { type: Date },
    },
    // { timestamps: true }
    )

module.exports = mongoose.model('wallet', walletSchema)
