const mongoose = require('mongoose');

//*Schema
const UserSchema = new mongoose.Schema(
	{
		firstName: String,
		lastName: String,
		contactNumber: String,
		address: String,
		email: String,
		password: String,
		sex: String,
		type: {
			type: String,
			default: 'user',
		},
	},
	{
		timestamps: true,
	},
);

module.exports = mongoose.model('User', UserSchema);
