const mongoose = require('mongoose');

const User = mongoose.Schema(
	{
		name: { type: String, required: true },
		email: { type: String, required: true, unique: true },
		password: { type: String, required: true },
		todos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Todo' }],
	},
	{ collection: 'users' }
);

const model = mongoose.model('UserData', User);

module.exports = model;
