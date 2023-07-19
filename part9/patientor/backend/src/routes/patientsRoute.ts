/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import express from 'express';
import patientService from '../services/patientService';

const patientsRouter = express.Router();

patientsRouter.get('/', (_req, res) => {
	res.send(patientService.getNonSensitivePatients());
});

patientsRouter.post('/', (req, res) => {
	const { name, dateOfBirth, ssn, gender, occupation } = req.body;

	const addedPatient = patientService.addPatient({
		name,
		dateOfBirth,
		ssn,
		gender,
		occupation,
	});
	res.json(addedPatient);
});

export default patientsRouter;