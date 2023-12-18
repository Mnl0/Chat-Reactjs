
import express from 'express';
import { createServer } from 'node:http';
import { Server } from 'socket.io'
import morgan from 'morgan';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import router from '../route/route.js';

const PORT = 3000 ?? process.env.PORT;
const DB = 'ChatBD' ?? process.env.DB;
const USER = 'manu' ?? process.env.USER;
const PASS = '71UFkz7usEtnXQhp' ?? process.env.PASS;
const URI = `mongodb+srv://${USER}:${PASS}@cluster0.ku5gd.mongodb.net/${DB}?retryWrites=true&w=majority`
mongoose.Promise = global.Promise;

const app = express();

const server = createServer(app);
const io = new Server(server, {
	cors: { origin: '*' }
});

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'Content-Type');
	res.header('Access-Control-Allow-Methods', 'GET', 'POST', 'PUT', 'DELETE');
	next();
})
app.use('/api', router)

mongoose.connect(URI) ? console.log('Connected to MongoDB') : console.log('Error connecting to MongoDB');

server.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
})
