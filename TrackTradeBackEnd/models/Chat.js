const { Schema, model } = require('mongoose');

const chatSchema = new Schema({
    user1: String,
    user2: String,
    messages: [{
        type: Schema.Types.ObjectId, 
        ref: "Message"
    }]
}, { timestamps: { createdAt: 'created_at' } })

module.exports = model('Chat', chatSchema);
