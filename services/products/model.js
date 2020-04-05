const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//creating a non strict schema for deals
//non strict means it can a 'deal' document can also contain other attributes not defined in the schema.
const productSchema = new Schema({
    name: {
        type: String,
        required: true
    }, 
    imageUrl: {
        type: String
    },
    description: {
        type: String
    },
    quantity: {
        type: Number
    },
    price: {
        type: Number
    },
    foodType: {
        type: String
    }
}, {
    timestamps: {createdAt: 'created_at', updatedAt: 'updated_at'},
    strict: false
});

var Product = mongoose.model('Product', productSchema);
module.exports = Product;