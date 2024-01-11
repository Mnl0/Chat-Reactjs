
import express from 'express';
import { createServer } from 'node:http';
import { Server } from 'socket.io'
import morgan from 'morgan';
import mongoose from 'mongoose';
import router from '../route/userRoute.js';
import msgRoute from '../route/messageRoute.js';
import dotenv from 'dotenv';
dotenv.config();

const PORT = process.env.PORT ?? 3001;
const DB = process.env.DB;
const USER = process.env.USER;
const PASS = process.env.PASS;

const URI = `mongodb+srv://${USER}:${PASS}@cluster0.ku5gd.mongodb.net/${DB}?retryWrites=true&w=majority`
mongoose.Promise = global.Promise;

const app = express();

const server = createServer(app);
const io = new Server(server, {
	cors: { origin: '*' }
});

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'Content-Type');
	res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS, PATCH');
	next();
});

app.use("/api/auth", router);
app.use('/api/msg', msgRoute);

io.on('connection', (socket) => {
	console.log('User connected', socket.id);

	socket.on('message', (message, nickname) => {
		socket.broadcast.emit({
			body: message,
			from: nickname
		})
	})
})

mongoose.connect(URI) ? console.log('Connected to MongoDB') : console.log('Error connecting to MongoDB');

server.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
})
