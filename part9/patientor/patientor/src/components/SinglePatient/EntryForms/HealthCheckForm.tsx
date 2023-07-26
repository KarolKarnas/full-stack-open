import { useState } from 'react';
import {
	Patient,
	Diagnosis,
	HealthCheckEntry,
	NewEntry,
} from '../../../types';
import patientService from '../../../services/patients';

import { TextField, Button, Box } from '@mui/material';
import { parseHealthCheckRating } from '../../../utils';

import axios from 'axios';

interface Props {
	id: string | undefined;
	setPatient: React.Dispatch<React.SetStateAction<Patient | undefined>>;
	setNotification: React.Dispatch<React.SetStateAction<string | null>>;
}

const HealthCheckForm = ({ id, setPatient, setNotification }: Props) => {
	const [description, setDescription] =
		useState<HealthCheckEntry['description']>('');
	const [date, setDate] = useState<HealthCheckEntry['date']>('');
	const [specialist, setSpecialist] =
		useState<HealthCheckEntry['specialist']>('');
	const [healthCheckRating, setHealthCheckRating] =
		useState<HealthCheckEntry['healthCheckRating']>(0);
	const [diagnosisCodes, setDiagnosisCodes] = useState<string>('');

	const checkHealthCheckRating = (e: React.SyntheticEvent) => {
		try {
			const inputElement = e.target as HTMLInputElement;
			const value = inputElement.value;
			const result = parseHealthCheckRating(Number(value));
			console.log(result);
			setHealthCheckRating(result);
		} catch (error) {
			console.log(error);
			// setHealthCheckRating(0);
		}
	};

	const handleSubmit = async (e: React.SyntheticEvent) => {
		const parseDiagnosisCodes = (
			diagnosisCodes: string
		): Array<Diagnosis['code']> => {
			const delimiter = ', ';
			const result = diagnosisCodes.split(delimiter);
			return result;
		};

		const parsedDiagnosisCodes = parseDiagnosisCodes(diagnosisCodes);
		e.preventDefault();
		// const newEntry: NewHealthCheckEntry = {
		const newEntry: NewEntry = {
			diagnosisCodes: parsedDiagnosisCodes,
			date,
			specialist,
			type: 'HealthCheck',
			description,
			healthCheckRating,
		};
		console.log(newEntry);

		try {
			if (id) {
				const entry = await patientService.createEntry(id, newEntry);
				console.log(entry);
				const updatedPatient = await patientService.getPatient(id);
				setPatient(updatedPatient);
			}
		} catch (e: unknown) {
			if (axios.isAxiosError(e)) {
				if (e?.response?.data && typeof e?.response?.data === 'string') {
					const message = e.response.data.replace(
						'Something went wrong. Error: ',
						''
					);
					console.error(message);
					setNotification(message);
				} else {
					setNotification('Unrecognized axios error');
				}
			} else {
				console.error('Unknown error', e);
				setNotification('Unknown error');
			}
		}
	};

	return (
		<>
			<h3>New HealthCheck entry</h3>
			<form onSubmit={handleSubmit}>
				<TextField
					type='text'
					variant='standard'
					color='primary'
					label='Description'
					onChange={(e) => setDescription(e.target.value)}
					value={description}
					fullWidth
					// required
					sx={{ mb: 1 }}
				/>
				<TextField
					InputLabelProps={{ shrink: true }}
					type='date'
					variant='standard'
					color='primary'
					label='Date'
					onChange={(e) => setDate(e.target.value)}
					value={date}
					fullWidth
					// required
					sx={{ mb: 1 }}
				/>
				<TextField
					type='text'
					variant='standard'
					color='primary'
					label='Specialist'
					onChange={(e) => setSpecialist(e.target.value)}
					value={specialist}
					fullWidth
					// required
					sx={{ mb: 1 }}
				/>
				<TextField
					type='text'
					variant='standard'
					color='primary'
					label='HealthCheckRating'
					onChange={checkHealthCheckRating}
					value={healthCheckRating}
					fullWidth
					// required
					sx={{ mb: 1 }}
				/>
				<TextField
					type='text'
					variant='standard'
					color='primary'
					label='DiagnosisCodes'
					onChange={(e) => setDiagnosisCodes(e.target.value)}
					value={diagnosisCodes}
					fullWidth
					// required
					sx={{ mb: 1 }}
				/>

				<Box
					m={1}
					//margin
					display='flex'
					justifyContent='center'
					alignItems='flex-end'
				>
					<Button variant='outlined' color='primary' type='submit'>
						Send
					</Button>
				</Box>
			</form>
		</>
	);
};
export default HealthCheckForm;
