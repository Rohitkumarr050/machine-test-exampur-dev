const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.ObjectId

const transactionSchema = new mongoose.Schema(
    {
        // userId: { type: ObjectId, ref: "user" },
        userName: { type: String},
        walletId: { type: ObjectId, ref: "wallet" },
        transactionType: { type: String, enum: ["credit", "debit"] },
        status: { type: String, enum: ["success", "failed"] },
        amount: { type: String , required: true },
        description: { type: String },
        createdAt:{ type: Date },
    },
    // { timestamps: true }
    )

module.exports = mongoose.model('transaction', transactionSchema)
