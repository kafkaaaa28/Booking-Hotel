import express from 'express';
import db from './config/Database.js';
import dotenv from 'dotenv';
import router from './Routes/index.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
dotenv.config();
const app = express();

try {
  await db.authenticate();
  console.log('db conected');
} catch (err) {
  console.error(`db not connected : ${err}`);
}
app.use(express.json());
app.use(cookieParser());
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
app.use(router);
app.listen(5000, () => console.log('Server running at port 5000'));
