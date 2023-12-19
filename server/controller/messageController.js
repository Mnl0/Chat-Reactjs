import MessageModel from "../model/messageModel.js";

const messageController = {
	save: async (req, res) => {
		const { message, from } = req.body
		const newMessage = new MessageModel()
		newMessage.message = message
		newMessage.from = from
		console.log(newMessage)
		const saveMessage = await newMessage.save()
		return res.status(200).send(saveMessage)
	},
	getMessages: async (req, res) => {
		const messages = await MessageModel.find()
		console.log(messages)
		return res.status(200).send(messages)
	}
}
export default messageController