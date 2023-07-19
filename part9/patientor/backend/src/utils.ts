import { NewPatient } from './types';

const isString = (text: unknown): text is string => {
	return typeof text === 'string' || text instanceof String;
};

const parseName = (name: unknown): string => {
	if (!name || !isString(name)) {
		throw new Error('Incorrect or missing name');
	}

	return name;
};
const isDate = (date: string): boolean => {
	return Boolean(Date.parse(date));
};

const parseDate = (date: unknown): string => {
	if (!date || !isString(date) || !isDate(date)) {
		throw new Error('Incorrect or missing date: ' + date);
	}
	return date;
};

const isSsn = (ssn: string): boolean => {
	const regex = /^[0-9a-zA-Z]{6}-[0-9a-zA-Z]{4}$/;
	return regex.test(ssn);
};

const parseSsn = (ssn: unknown): string => {
	if (!ssn || !isString(ssn) || !isSsn(ssn)) {
		throw new Error('Incorrect or missing ssn');
	}

	return ssn;
};

const pareGender = (gender: unknown): string => {
	if (!gender || !isString(gender)) {
		throw new Error('Incorrect or missing gender');
	}
	return gender;
};
const pareOccupation = (occupation: unknown): string => {
	if (!occupation || !isString(occupation)) {
		throw new Error('Incorrect or missing occupation');
	}
	return occupation;
};

const toNewPatient = (object: unknown): NewPatient => {
	if (!object || typeof object !== 'object') {
		throw new Error('Incorrect or missing data');
	}
	if (
		'name' in object &&
		'dateOfBirth' in object &&
		'ssn' in object &&
		'gender' in object &&
		'occupation' in object
	) {
		const newEntry: NewPatient = {
			name: parseName(object.name),
			dateOfBirth: parseDate(object.dateOfBirth),
			ssn: parseSsn(object.ssn),
			gender: pareGender(object.gender),
			occupation: pareOccupation(object.occupation),
		};
		return newEntry;
	}

	throw new Error('Incorrect data: some fields are missing');
};

export default toNewPatient;
