import express from 'express';
import diagnosesRouter from './routes/diagnoses';
import cors from 'cors';
const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/diagnoses', diagnosesRouter);

const PORT = 3001;

app.get('/api/ping', (_req, res) => {
	console.log('someone pinged here');
	res.send('pong');
});

app.listen(PORT, () => {
	console.log(`RUNNING http://localhost:${PORT}/api/ping`);
});
