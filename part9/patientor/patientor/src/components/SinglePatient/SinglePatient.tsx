import { useState, useEffect } from 'react';
import { Patient, Diagnosis } from '../../types';
import { useParams } from 'react-router-dom';
import patientService from '../../services/patients';
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import TransgenderIcon from '@mui/icons-material/Transgender';

interface Props {
	diagnoses : Diagnosis[]
}

const SinglePatient = ({diagnoses}: Props) => {
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

							{patient.entries.map((entry) => {
								return (
									<div key={entry.id}>
										<p>
											{entry.date} {entry.description}
										</p>
										{entry.diagnosisCodes && (
											<ul>
												{' '}
												{entry.diagnosisCodes.map((dc) => {
									const diagnosis = diagnoses.find(diagnosis => dc === diagnosis.code)
													return (
														<li key={dc}>{dc} - {diagnosis?.name}</li>
													);
												})}
											</ul>
										)}
									</div>
								);
							})}
						</>
					)}
				</>
			)}
		</div>
	);
};

export default SinglePatient;
