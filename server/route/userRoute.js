import express from 'express';
import userController from '../controller/userController.js';

const route = express.Router();

route.post('/register', userController.register);
route.post('/login', userController.login);
route.put('/setavatar/:id', userController.setAvatar)
route.get('/getallusers/:id', userController.getAllUsers)


export default route;