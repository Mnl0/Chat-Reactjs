import mongoose from "mongoose";

const Schema = mongoose.Schema;

const MessageSchema = new Schema(
	{
		message: {
			text: {
				type: String,
				required: true,
			},
		},
		users: Array,
		from: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'UserModel',
			required: true,
		},
	},

	{
		timestamps: true,
	}

)
export default mongoose.model('MessageModel', MessageSchema)
