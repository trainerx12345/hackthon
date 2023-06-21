const mongoose = require('mongoose');
const mongooseAutoPopulate = require('mongoose-autopopulate');

//*Schema
const PostSchema = new mongoose.Schema(
	{
		title: { type: String, required: true },
		status: {
			type: String,
			default: 'Missing',
		},
		type: {
			type: String,
			default: 'Pending',
		},
		fullName: String,
		image: [String],
		description: String,
		userId: { type: mongoose.ObjectId, ref: 'User', autopopulate: true },
	},
	{
		timestamps: true,
	},
);
PostSchema.plugin(mongooseAutoPopulate);
module.exports = mongoose.model('Post', PostSchema);
