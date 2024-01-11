import MessageModel from "../model/messageModel.js";

const messageController = {
	save: async (req, res, next) => {
		try {
			const { message, from, to } = req.body
			const newMessage = new MessageModel()
			newMessage.message = { text: message }
			newMessage.from = from
			newMessage.to = [from, to]
			console.log(newMessage)
			const saveMessage = await newMessage.save()
			return res.status(200).send(saveMessage)
		} catch (err) {
			console.log(err)
		}
	},
	getMessages: async (req, res) => {
		try {
			const { from, to } = req.query;
			const messages = await MessageModel.find({
				users: {
					$all: [from, to],
				}
			})
			const messageFilter = messages.map(msg => {
				return {
					fromSelf: msg.from === from,
					message: msg.message.text,
				}
			})
			console.log(messageFilter)
			return res.json(messageFilter)
		} catch (err) {
			console.log(err)
		}
	}
}
export default messageController