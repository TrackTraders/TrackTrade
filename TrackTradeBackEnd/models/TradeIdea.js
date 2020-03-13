const { Schema, model } = require('mongoose');

const tradeIdeaSchema = new Schema({
    trade: {
        trader: String,
        currency: String,
        kind: String,
        entry: Number,
        stoploss: Number,
        takeprofit: Number,
        lot: Number,
        description: String
    }
}, { timestamps: { createdAt: 'created_at' } })

module.exports = model('TradeIdea', tradeIdeaSchema);
