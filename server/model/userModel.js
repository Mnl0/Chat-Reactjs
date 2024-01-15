import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const UserSchema = new Schema({
	username: {
		type: String,
		required: true,
		unique: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
		max: 50,
	},
	password: {
		type: String,
		required: true,
	},
	isAvatarImageSet: {
		type: Boolean,
		default: false,
	},
	avatarImage: {
		type: String,
		default: "",
	},
})
export default mongoose.model('UserModel', UserSchema)