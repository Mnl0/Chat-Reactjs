import UserModel from '../model/userModel.js';
import bcrypt from 'bcrypt';
const user = {
	register: async (req, res, next) => {
		try {

			const { username, email, password } = req.body;
			const userNameCheck = await UserModel.findOne({ username });
			if (userNameCheck) {
				return res.status(400).json({
					message: 'El nombre de usuario ya existe',
					status: false
				});
			}
			const emailCheck = await UserModel.findOne({ email });
			if (emailCheck) {
				return res.status(400).json({
					message: 'El email ya existe',
					status: false
				});
			}
			const hashedPassword = await bcrypt.hash(password, 10);
			const newUser = await UserModel.create({
				username,
				email,
				password: hashedPassword
			});
			delete newUser.password;
			return res.status(201).json({
				message: 'Usuario creado',
				status: true,
				data: newUser
			});
		} catch (error) {
			next(error);
		}
	},
	login: async (req, res, next) => {
		try {

			const { username, password } = req.body;
			const user = await UserModel.findOne({ username });
			if (!user) {
				return res.status(400).json({
					message: 'Usuario incorrecto',
					status: false
				});
			}
			const passwordCheck = await bcrypt.compare(password, user.password);
			if (!passwordCheck) {
				return res.status(400).json({
					message: 'Contraseña incorrecta',
					status: false
				});
			}
			delete user.password;
			return res.status(200).json({
				message: 'Usuario logeado',
				status: true,
				data: user
			});
		} catch (error) {
			next(error);
		}
	},
	setAvatar: async (req, res, next) => {
		try {
			const userId = req.params.id;
			const avatarImage = req.body.image;
			const userData = await UserModel.findOneAndUpdate({ _id: userId }, {
				isAvatarImageSet: true,
				avatarImage,
			})
			return res.json({ image: userData.avatarImage, status: true })
		} catch (error) {
			next(error)
		}
	},
	getAllUsers: async (req, res, next) => {
		try {
			const users = await UserModel.find({ _id: { $ne: req.params.id } }).select([
				"email",
				"username",
				"avatarImage",
				"_id",
			]);
			// return res.json({ message: 'test response', users });
			return res.json(users);
		} catch (error) {
			next(error)
		}
	}
}
export default user;
