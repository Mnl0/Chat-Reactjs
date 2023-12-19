import mongoose from "mongoose";

const Schema = mongoose.Schema;

const MessageSchema = new Schema({
	message: {
		type: String,
	},
	from: {
		type: String,
	}
})
export default mongoose.model('MessageModel', MessageSchema)

