import express from 'express';
import diagnoseService from '../services/diagnoseService';

const diagnosesRouter = express.Router();

diagnosesRouter.get('/', (_req, res) => {
	res.send(diagnoseService.getDiagnoses());
});

diagnosesRouter.post('/', (_req, res) => {
	res.send('Save diagnose');
});

export default diagnosesRouter;
