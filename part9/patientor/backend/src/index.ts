import express from 'express';
import diagnosesRouter from './routes/diagnosesRoute';
import patientsRouter from './routes/patientsRoute';
import cors from 'cors';
const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());
app.use('/api/diagnoses', diagnosesRouter);
app.use('/api/patients', patientsRouter);


app.get('/api/ping', (_req, res) => {
	console.log('someone pinged here');
	res.send('pong');
});

app.listen(PORT, () => {
	console.log(`RUNNING http://localhost:${PORT}/api/ping`);
});
