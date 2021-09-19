import express from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import mustBeSecure from './middleware/mustBeSecure';

dotenv.config();

const app = express();
app.set('trust proxy', 1);

app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());
app.use(mustBeSecure);
app.get('/', (req, res) => { res.send('<h1>HOLA!</h1>'); });

app.get('/*', (req, res) => { res.send('<h1>404!</h1>'); });
export default app;
