const { Schema, model } = require('mongoose');

const tradeSchema = new Schema({
    trade: {
        trader: String,
        currency: String,
        kind: String,
        entry: Number,
        close: Number,
        lot: Number,
        money: Number,
        description: String,
        imageURL: String,
        risk: Number,
        imageUrl: String
    }
}, { timestamps: { createdAt: 'created_at' } })

module.exports = model('Trade', tradeSchema);
