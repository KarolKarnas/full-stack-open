import patients from '../../data/patients';
import { Patient, NonSensitivePatients } from '../types';

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

export default {
	getPatients,
	getNonSensitivePatients,
};
