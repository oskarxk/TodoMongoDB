const mongooose = require('mongoose');

const todoSchema = mongooose.Schema(
	{
		text: {
			type: String,
			required: [true, 'Please add a text value'],
		},
		isDone: {
			type: Boolean,
			default: false,
		},
		user: { type: mongooose.Schema.Types.ObjectId, ref: 'User' },
	},
	{
		timestamps: true,
	}
);

module.exports = mongooose.model('Todo', todoSchema);
