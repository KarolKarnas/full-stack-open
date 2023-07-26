import { useState } from 'react';
import { Patient, Diagnosis, HospitalEntry, NewEntry } from '../../../types';
import patientService from '../../../services/patients';

import { TextField, Button, Box, Stack } from '@mui/material';
// import { parseHealthCheckRating } from '../../../utils';

import axios from 'axios';

interface Props {
	id: string | undefined;
	setPatient: React.Dispatch<React.SetStateAction<Patient | undefined>>;
	setNotification: React.Dispatch<React.SetStateAction<string | null>>;
}

const HospitalForm = ({ id, setPatient, setNotification }: Props) => {
	const [description, setDescription] =
		useState<HospitalEntry['description']>('');
	const [date, setDate] = useState<HospitalEntry['date']>('');
	const [specialist, setSpecialist] = useState<HospitalEntry['specialist']>('');
	const [diagnosisCodes, setDiagnosisCodes] = useState<string>('');

	const [dischargeDate, setDischargeDate] =
		useState<HospitalEntry['discharge']['date']>('');
	const [dischargeCriteria, setDischargeCriteria] =
		useState<HospitalEntry['discharge']['criteria']>('');

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
			type: 'Hospital',
			description,
			discharge: {
				date: dischargeDate,
				criteria: dischargeCriteria,
			},
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
			<h3>New Hospital entry</h3>
			<form onSubmit={handleSubmit}>
				<TextField
					type='text'
					variant='standard'
					color='primary'
					label='Description'
					onChange={(e) => setDescription(e.target.value)}
					value={description}
					// fullWidth
					required
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
        {/* here */}
        <Stack spacing={2} direction="row" sx={{marginBottom: 1, marginTop: 2}}>
				<TextField
        					InputLabelProps={{ shrink: true }}
					type='date'
					variant='standard'
					color='primary'
					label='Discharge Date'
					onChange={(e) => setDischargeDate(e.target.value)}
					value={dischargeDate}
					fullWidth
					// required
					sx={{ mb: 1 }}
				/>
				<TextField
					type='text'
					variant='standard'
					color='primary'
					label='Discharge Criteria'
					onChange={(e) => setDischargeCriteria(e.target.value)}
					value={dischargeCriteria}
					fullWidth
					// required
					sx={{ mb: 1 }}
				/>
        </Stack>
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
export default HospitalForm;
