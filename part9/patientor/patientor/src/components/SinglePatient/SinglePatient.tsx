import { useState, useEffect } from 'react';
import { Patient, Diagnosis } from '../../types';
import { useParams } from 'react-router-dom';
import patientService from '../../services/patients';

import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import TransgenderIcon from '@mui/icons-material/Transgender';

import EntryComp from './EntryComp';

interface Props {
	diagnoses: Diagnosis[];
}

const SinglePatient = ({ diagnoses }: Props) => {
	const { id } = useParams();
	const [patient, setPatient] = useState<Patient>();
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
