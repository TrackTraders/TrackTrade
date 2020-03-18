const { Schema, model } = require('mongoose');

const messageSchema = new Schema({
    content: String,
    receiver: String,
    sender: String
}, { timestamps: { createdAt: 'created_at' } })

module.exports = model('Message', messageSchema);
