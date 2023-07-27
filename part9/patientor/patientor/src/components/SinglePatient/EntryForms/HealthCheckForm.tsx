import { useState } from 'react';
import { Patient, Diagnosis, HealthCheckEntry, NewEntry } from '../../../types';
import patientService from '../../../services/patients';

import {
	TextField,
	Button,
	Box,
	RadioGroup,
	FormControlLabel,
	Radio,
	FormLabel,
	InputLabel,
	Select,
	OutlinedInput,
	Theme,
	MenuItem,
	useTheme,
	SelectChangeEvent,
} from '@mui/material';
import { parseHealthCheckRating } from '../../../utils';

import axios from 'axios';

function getStyles(diagnose: string, diagnosisCodes: string[], theme: Theme) {
	return {
		fontWeight:
			diagnosisCodes.indexOf(diagnose) === -1
				? theme.typography.fontWeightRegular
				: theme.typography.fontWeightMedium,
	};
}
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const MenuProps = {
	PaperProps: {
		style: {
			maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
			width: 250,
		},
	},
};

interface Props {
	id: string | undefined;
	setPatient: React.Dispatch<React.SetStateAction<Patient | undefined>>;
	setNotification: React.Dispatch<React.SetStateAction<string | null>>;
	diagnoses: Diagnosis[];
}

const HealthCheckForm = ({
	id,
	diagnoses,
	setPatient,
	setNotification,
}: Props) => {
	const theme = useTheme();
	const [description, setDescription] =
		useState<HealthCheckEntry['description']>('');
	const [date, setDate] = useState<HealthCheckEntry['date']>('');
	const [specialist, setSpecialist] =
		useState<HealthCheckEntry['specialist']>('');
	const [healthCheckRating, setHealthCheckRating] =
		useState<HealthCheckEntry['healthCheckRating']>(0);
	const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);

	// const checkHealthCheckRating = (e: React.SyntheticEvent) => {
	// 	try {
	// 		const inputElement = e.target as HTMLInputElement;
	// 		const value = inputElement.value;
	// 		const result = parseHealthCheckRating(Number(value));
	// 		console.log(result);
	// 		setHealthCheckRating(result);
	// 	} catch (error) {
	// 		console.log(error);
	// 		// setHealthCheckRating(0);
	// 	}
	// };

	// const diagnosesArr: string[] =[]
	// diagnoses.forEach(diagnoses => diagnosesArr.push(diagnoses.code))
	const diagnosesArr: string[] = diagnoses.map((diagnosis) => diagnosis.code);

	const handleChangeHealthRating = (e: React.ChangeEvent<HTMLInputElement>) => {
		console.log();
		try {
			const value = Number(e.target.value);
			console.log(value);
			const result = parseHealthCheckRating(value);
			setHealthCheckRating(result);
		} catch (error) {
			console.log(error);
		}
	};

	const handleSubmit = async (e: React.SyntheticEvent) => {
		e.preventDefault()
		// const newEntry: NewHealthCheckEntry = {
		const newEntry: NewEntry = {
			diagnosisCodes,
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

	const handleChangeDiagnosisCodes = (
		e: SelectChangeEvent<typeof diagnosisCodes>
	) => {
		const {
			target: { value },
		} = e;

		setDiagnosisCodes(typeof value === 'string' ? value.split(',') : value);
		// const parseDiagnosisCodes = (
		// 	diagnosisCodes: string
		// ): Array<Diagnosis['code']> => {
		// 	const delimiter = ', ';
		// 	const result = diagnosisCodes.split(delimiter);
		// 	return result;
		// };

		// const parsedDiagnosisCodes = parseDiagnosisCodes(diagnosisCodes);
		// e.preventDefault();
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
				<FormLabel id='HealthCheckRatingLabel'>HealthCheckRating</FormLabel>
				<RadioGroup
					defaultValue='0'
					name='HealthCheckRating'
					row
				>
					<FormControlLabel
						value='0'
						control={<Radio onChange={handleChangeHealthRating} />}
						label='0'
					/>
					<FormControlLabel
						value='1'
						control={<Radio onChange={handleChangeHealthRating} />}
						label='1'
					/>
					<FormControlLabel
						value='2'
						control={<Radio onChange={handleChangeHealthRating} />}
						label='2'
					/>
					<FormControlLabel
						value='3'
						control={<Radio onChange={handleChangeHealthRating} />}
						label='3'
					/>
				</RadioGroup>
				<InputLabel id='demo-multiple-name-label'>Name</InputLabel>
				<Select
					labelId='demo-multiple-name-label'
					id='demo-multiple-name'
					multiple
					value={diagnosisCodes}
					onChange={handleChangeDiagnosisCodes}
					input={<OutlinedInput label='Name' />}
					fullWidth
					MenuProps={MenuProps}
				>
					{diagnosesArr.map((diagnose) => (
						<MenuItem
							key={diagnose}
							value={diagnose}
							style={getStyles(diagnose, diagnosisCodes, theme)}
						>
							{diagnose}
						</MenuItem>
					))}
				</Select>

				<Box
					m={1}
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
