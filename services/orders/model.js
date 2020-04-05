const mongoose = require('mongoose');
const autopopulate = require('mongoose-autopopulate');
const Schema = mongoose.Schema;

//creating a non strict schema for deals
//non strict means it can a 'deal' document can also contain other attributes not defined in the schema.
const orderSchema = new Schema({
    id: {
        type: String
    },
    items: [{ product:{ type: Schema.Types.ObjectId, ref: 'Product', autopopulate: true }, quantity: Number}],
    orderedBy: { type: Schema.Types.ObjectId, ref: 'User', autopopulate: true },
    totalPrice: {
        type: Number
    }
}, {
    timestamps: {createdAt: 'created_at', updatedAt: 'updated_at'},
    strict: false
});

orderSchema.plugin(autopopulate);

var Order = mongoose.model('Order', orderSchema);
module.exports = Order;