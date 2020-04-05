const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//creating a non strict schema for deals
//non strict means it can a 'deal' document can also contain other attributes not defined in the schema.
const messageSchema = new Schema({
    text: {
        type: String,
        required: true
    },
    by: { type: Schema.Types.ObjectId, ref: 'User' }
}, {
    timestamps: {createdAt: 'created_at', updatedAt: 'updated_at'},
    strict: false
});

var Message = mongoose.model('Message', messageSchema);
module.exports = Message;