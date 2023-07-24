import patients from '../../data/patients';
import { Patient, NonSensitivePatients, NewPatient } from '../types';
import { v4 as uuid } from 'uuid';

const getPatients = (): Patient[] => {
	return patients;
};

const getNonSensitivePatients = (): NonSensitivePatients[] => {
	return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
		id,
		name,
		dateOfBirth,
		gender,
		occupation,
	}));
};

const finById = (id: string): Patient | undefined => {
	const patient = patients.find((patient) => patient.id === id);
	return patient;
};

const addPatient = (entry: NewPatient): Patient => {
	const newPatient = {
		id: uuid(),
		...entry,
	};
	patients.push(newPatient);
	return newPatient;
};

export default {
	getPatients,
	getNonSensitivePatients,
	addPatient,
	finById
};
