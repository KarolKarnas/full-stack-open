import patients from '../../data/patients';
import {
	Patient,
	NonSensitivePatients,
	NewPatient,
	Entry,
	NewEntry,
} from '../types';
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

const addEntry = (id: string, entry: NewEntry): Entry => {
	const newEntry = {
		id: uuid(),
		...entry,
	};

	// console.log(newEntry);

	const patient = patients.find((patient) => patient.id === id);
	patient?.entries.push(newEntry);
	return newEntry;
};

export default {
	getPatients,
	getNonSensitivePatients,
	addPatient,
	finById,
	addEntry,
};
