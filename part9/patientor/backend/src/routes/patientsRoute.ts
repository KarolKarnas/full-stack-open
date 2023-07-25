import express from 'express';
import patientService from '../services/patientService';
import { toNewPatient, toNewEntry } from '../utils';

const patientsRouter = express.Router();

patientsRouter.get('/', (_req, res) => {
	res.send(patientService.getNonSensitivePatients());
});

patientsRouter.get('/:id', (req, res) => {
	const patient = patientService.finById(req.params.id);

	if (patient) {
		res.send(patient);
	} else {
		res.sendStatus(404);
	}
});

patientsRouter.post('/:id/entries', (req, res) => {
	try {
		const newEntry = toNewEntry(req.body);
		const addedEntry = patientService.addEntry(req.params.id, newEntry);
		res.json(addedEntry);
	} catch (error: unknown) {
		let errorMessage = 'Something went wrong.';
		if (error instanceof Error) {
			errorMessage += ' Error: ' + error.message;
		}
		res.status(400).send(errorMessage);
	}
});

patientsRouter.post('/', (req, res) => {
	try {
		const newPatient = toNewPatient(req.body);
		// const { name, dateOfBirth, ssn, gender, occupation } = req.body;

		const addedPatient = patientService.addPatient(newPatient);
		res.json(addedPatient);
	} catch (error: unknown) {
		let errorMessage = 'Something went wrong.';
		if (error instanceof Error) {
			errorMessage += ' Error: ' + error.message;
		}
		res.status(400).send(errorMessage);
	}
});

export default patientsRouter;
