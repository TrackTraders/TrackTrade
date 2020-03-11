const { Schema, model } = require('mongoose');

const tradeSchema = new Schema({
    userID: String,
    trade: {
        currency: String,
        type: String,
        entry: Number,
        close: Number,
        lot: Number
    }
})

module.exports = model('Trade', tradeSchema);
