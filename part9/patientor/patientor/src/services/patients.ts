import axios from 'axios';
import {
	Patient,
	PatientFormValues,
	Entry,
	NewEntry,
	// NewHealthCheckEntry,
} from '../types';

import { apiBaseUrl } from '../constants';

const getAll = async () => {
	const { data } = await axios.get<Patient[]>(`${apiBaseUrl}/patients`);

	return data;
};

const getPatient = async (id: string) => {
	const { data } = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);

	return data;
};

const create = async (object: PatientFormValues) => {
	const patientWithEntries: PatientFormValues = {
    ...object,
    entries: []
  };

	// console.log(object)
	const { data } = await axios.post<Patient>(`${apiBaseUrl}/patients`, patientWithEntries);

	return data;
};

const createEntry = async (id: string, object: NewEntry) => {
	const { data } = await axios.post<Entry>(
		`${apiBaseUrl}/patients/${id}/entries`,
		object
	);

	// console.log(data)

	return data;
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
	getAll,
	create,
	getPatient,
	createEntry,
};
