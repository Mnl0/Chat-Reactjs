import express from "express";
import messageController from "../controller/messageController.js";

const route = express.Router();

route.post('/save', messageController.save);
route.get('/getmsg', messageController.getMessages);

export default route;
