import { useState, useEffect } from 'react';
import { Patient, Diagnosis } from '../../types';
import { useParams } from 'react-router-dom';
import patientService from '../../services/patients';

import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import TransgenderIcon from '@mui/icons-material/Transgender';

import EntryComp from './EntryComp';
import Notification from './Notification';

import HealthCheckForm from './EntryForms/HealthCheckForm';
import HospitalForm from './EntryForms/Hospital';

import OccupationalHealthcareForm from './EntryForms/OccupationalHealthcareForm';

interface Props {
	diagnoses: Diagnosis[];
}

const SinglePatient = ({ diagnoses }: Props) => {
	const { id } = useParams();
	const [notification, setNotification] = useState<string | null>(null);
	const [patient, setPatient] = useState<Patient>();

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
					<Notification
						notification={notification}
						setNotification={setNotification}
					/>
					<HealthCheckForm
						id={id}
						setPatient={setPatient}
						setNotification={setNotification}
					/>
					<HospitalForm
						id={id}
						setPatient={setPatient}
						setNotification={setNotification}
					/>
					<OccupationalHealthcareForm
						id={id}
						setPatient={setPatient}
						setNotification={setNotification}
					/>

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
