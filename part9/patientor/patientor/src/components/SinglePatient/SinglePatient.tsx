import { useState, useEffect } from 'react';
import {
	Patient,
	Diagnosis,
	HealthCheckEntry,
	NewHealthCheckEntry,
} from '../../types';
import { useParams } from 'react-router-dom';
import patientService from '../../services/patients';

import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import TransgenderIcon from '@mui/icons-material/Transgender';

import EntryComp from './EntryComp';

import { TextField, Button, Box } from '@mui/material';

import { parseHealthCheckRating } from '../../utils';

import Notification from './Notification';

import axios from 'axios';
interface Props {
	diagnoses: Diagnosis[];
}

const SinglePatient = ({ diagnoses }: Props) => {
	const [notification, setNotification] = useState<string | null>(null);

	const { id } = useParams();

	const [patient, setPatient] = useState<Patient>();

	const [description, setDescription] =
		useState<HealthCheckEntry['description']>('');
	const [date, setDate] = useState<HealthCheckEntry['date']>('');
	const [specialist, setSpecialist] =
		useState<HealthCheckEntry['specialist']>('');
	const [healthCheckRating, setHealthCheckRating] =
		useState<HealthCheckEntry['healthCheckRating']>(0);
	const [diagnosisCodes, setDiagnosisCodes] = useState<string>('');

	// const [newHealthCheckEntry, setNewHealthCheckEntry] =
	// 	useState<NewHealthCheckEntry>({
	// 		date: '',
	// 		specialist: '',
	// 		type: 'HealthCheck',
	// 		description: '',
	// 		healthCheckRating: 0,
	// 		diagnosisCodes: [],
	// 	});

	// const [diagnosis, setDiagnosis] = useState<Diagnosis[]>();

	useEffect(() => {
		const fetchPatient = async () => {
			if (id) {
				const patientData = await patientService.getPatient(id);
				// console.log(patientData);
				setPatient(patientData);
			}
		};

		fetchPatient();
	}, [id]);

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
		const newEntry: NewHealthCheckEntry = {
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
		<div>
			<p>Patient</p>
			{patient && (
				<>
					<h1>
						{patient.name} {patient.gender === 'female' && <FemaleIcon />}
						{patient.gender === 'male' && <MaleIcon />}
						{patient.gender === 'other' && <TransgenderIcon />}
					</h1>
					<br />
					<span>ssh: {patient.ssn}</span>
					<br />
					<span>occupation: {patient.occupation}</span>
					<Notification
						notification={notification}
						setNotification={setNotification}
					/>
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
								sx={{ mb: 4 }}
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
								sx={{ mb: 4 }}
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
								sx={{ mb: 4 }}
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
								sx={{ mb: 4 }}
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
								sx={{ mb: 4 }}
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
					{patient.entries && (
						<>
							<h3>Entries</h3>

							<EntryComp
								entries={patient.entries}
								diagnoses={diagnoses}
							></EntryComp>
						</>
					)}
				</>
			)}
		</div>
	);
};

export default SinglePatient;
