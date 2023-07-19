import express from 'express';
import patientService from '../services/patientService';
import toNewPatient from '../utils';

const patientsRouter = express.Router();

patientsRouter.get('/', (_req, res) => {
	res.send(patientService.getNonSensitivePatients());
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
