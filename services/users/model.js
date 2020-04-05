const mongoose = require('mongoose');
require('mongoose-type-email');
const Schema = mongoose.Schema;

var userSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	phone: {
		type: String,
		required: true,
		unique: true
	},
	address: {
		type: String,
		required: true
	},
	email: {
		type: mongoose.SchemaTypes.Email,
		// allowBlank: true, // allow ('') as email value
		unique: true
	},

}, {
	timestamps: {createdAt: 'created_at', updatedAt: 'updated_at'},
	strict: false
});

var User = mongoose.model('User', userSchema);
module.exports = User;