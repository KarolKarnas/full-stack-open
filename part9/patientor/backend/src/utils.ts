import {
	NewPatient,
	Gender,
	Entry,
	NewEntry,
	HealthCheckRating,
	Diagnosis,
	HospitalEntry,
	OccupationalHealthcareEntry,
} from './types';

const isString = (text: unknown): text is string => {
	return typeof text === 'string' || text instanceof String;
};
const isNumber = (number: unknown): number is number => {
	return typeof number === 'number' || number instanceof Number;
};

const isArray = (arr: unknown): arr is Array<unknown> => {
	return typeof arr === 'object' && arr instanceof Array && Array.isArray(arr);
};
const isObject = (obj: unknown): obj is object => {
	return typeof obj === 'object' && obj instanceof Object;
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

const isGender = (param: string): param is Gender => {
	return Object.values(Gender)
		.map((v) => v.toString())
		.includes(param);
};

const parseGender = (gender: unknown): Gender => {
	if (!gender || !isString(gender) || !isGender(gender)) {
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

const isValidEntryType = (type: unknown): type is Entry['type'] => {
	return (
		typeof type === 'string' &&
		(type === 'HealthCheck' ||
			type === 'Hospital' ||
			type === 'OccupationalHealthcare')
	);
};

const parseEntries = (entries: unknown): Entry[] => {
	if (!entries || !isArray(entries)) {
		throw new Error('Incorrect or missing entries');
	}

	const typedEntries = entries as Entry[];

	typedEntries.forEach((entry: Entry) => {
		if (!isValidEntryType(entry.type)) {
			throw new Error('Incorrect or missing entry type');
		}
	});

	return typedEntries;
};

export const toNewPatient = (object: unknown): NewPatient => {
	if (!object || typeof object !== 'object') {
		throw new Error('Incorrect or missing data');
	}
	if (
		'name' in object &&
		'dateOfBirth' in object &&
		'ssn' in object &&
		'gender' in object &&
		'occupation' in object &&
		'entries' in object
	) {
		const newEntry: NewPatient = {
			name: parseName(object.name),
			dateOfBirth: parseDate(object.dateOfBirth),
			ssn: parseSsn(object.ssn),
			gender: parseGender(object.gender),
			occupation: pareOccupation(object.occupation),
			entries: parseEntries(object.entries),
		};
		return newEntry;
	}

	throw new Error('Incorrect data: some fields are missing');
};

const parseDescription = (description: unknown): string => {
	if (!description || !isString(description)) {
		throw new Error('Incorrect or missing description');
	}
	return description;
};
// const parseType = (type: unknown): Entry['type'] => {
// 	if (!type || !isValidEntryType(type)) {
// 		throw new Error('Incorrect or missing type');
// 	}
// 	return type;
// };

const parseSpecialist = (specialist: unknown): string => {
	if (!specialist || !isString(specialist)) {
		throw new Error('Incorrect or missing specialist');
	}
	return specialist;
};

const isHealthCheckRating = (param: number): param is HealthCheckRating => {
	return Object.values(HealthCheckRating)
		.map((v) => Number(v))
		.includes(param);
};

const parseHealthCheckRating = (
	healthCheckRating: unknown
): HealthCheckRating => {
	if (
		!healthCheckRating ||
		!isNumber(healthCheckRating) ||
		!isHealthCheckRating(healthCheckRating)
	) {
		throw new Error('Incorrect or missing healthCheckRating');
	}
	return healthCheckRating;
};

const parseDiagnosisCodes = (object: unknown): Array<Diagnosis['code']> =>  {
  if (!object || typeof object !== 'object' || !('diagnosisCodes' in object)) {
    // we will just trust the data to be in correct form
    return [] as Array<Diagnosis['code']>;
  }

  return object.diagnosisCodes as Array<Diagnosis['code']>;
};


const parseDischarge = (discharge: unknown): HospitalEntry['discharge'] => {
	const parseCriteria = (criteria: unknown): string => {
		if (!criteria || !isString(criteria)) {
			throw new Error('Incorrect or missing criteria');
		}
		return criteria;
	};

	if (
		!discharge ||
		!isObject(discharge) ||
		!('date' in discharge) ||
		!('criteria' in discharge)
	) {
		throw new Error('Incorrect or missing discharge');
	}

	const { date, criteria } = discharge as {
		date: unknown;
		criteria: unknown;
	};

	if (!isString(date) || !isString(criteria)) {
		throw new Error('Incorrect or missing discharge properties');
	}

	return {
		date: parseDate(date),
		criteria: parseCriteria(criteria),
	};
};

const parseEmployerName = (employerName: unknown): string => {
	if (!employerName || !isString(employerName)) {
		throw new Error('Incorrect or missing employerName');
	}
	return employerName;
};

const parseSickLeave = (
	sickLeave: unknown
): OccupationalHealthcareEntry['sickLeave'] => {
	if (
		!sickLeave ||
		!isObject(sickLeave) ||
		!('startDate' in sickLeave) ||
		!('endDate' in sickLeave)
	) {
		throw new Error('Incorrect or missing sickLeave');
	}

	const { startDate, endDate } = sickLeave as {
		startDate: unknown;
		endDate: unknown;
	};

	if (!isString(startDate) || !isString(endDate)) {
		throw new Error('Incorrect or missing sickLeave properties');
	}

	return {
		startDate: parseDate(startDate),
		endDate: parseDate(endDate),
	};
};

export const toNewEntry = (object: unknown): NewEntry => {
	if (!object || typeof object !== 'object') {
		throw new Error('Incorrect or missing data');
	}

	if ('type' in object && object.type === 'HealthCheck') {
		if (
			'date' in object &&
			'type' in object &&
			'specialist' in object &&
			'diagnosisCodes' in object &&
			'description' in object &&
			'healthCheckRating' in object
		) {
			const newEntry: NewEntry = {
				description: parseDescription(object.description),
				type: 'HealthCheck',
				date: parseDate(object.date),
				specialist: parseSpecialist(object.specialist),
				healthCheckRating: parseHealthCheckRating(object.healthCheckRating),
				diagnosisCodes: parseDiagnosisCodes(object),
			};
			return newEntry;
		}
	}
	if ('type' in object && object.type === 'Hospital') {
		if (
			'date' in object &&
			'type' in object &&
			'specialist' in object &&
			'diagnosisCodes' in object &&
			'description' in object &&
			'discharge' in object
		) {
			const newEntry: NewEntry = {
				description: parseDescription(object.description),
				type: 'Hospital',
				date: parseDate(object.date),
				specialist: parseSpecialist(object.specialist),
				diagnosisCodes: parseDiagnosisCodes(object),
				discharge: parseDischarge(object.discharge),
			};
			return newEntry;
		}
	}

	if ('type' in object && object.type === 'OccupationalHealthcare') {
		if (
			'date' in object &&
			'type' in object &&
			'specialist' in object &&
			'diagnosisCodes' in object &&
			'description' in object &&
			'employerName' in object &&
			'sickLeave' in object
		) {
			const newEntry: NewEntry = {
				description: parseDescription(object.description),
				type: 'OccupationalHealthcare',
				date: parseDate(object.date),
				specialist: parseSpecialist(object.specialist),
				diagnosisCodes: parseDiagnosisCodes(object),
				employerName: parseEmployerName(object.employerName),
				sickLeave: parseSickLeave(object.sickLeave),
			};
			return newEntry;
		}
	}

	throw new Error('Incorrect data: some fields are missing');
};
