import { Diagnosis, OccupationalHealthcareEntry } from '../../types';
import WorkIcon from '@mui/icons-material/Work';


interface EntryProps {
	entry: OccupationalHealthcareEntry;
	diagnoses: Diagnosis[];
}

const OccupationalHealthcareComp = ({ entry, diagnoses }: EntryProps) => {
	console.log(entry)
	return (
		<div className='entry'>
			<div>
				
				{entry.date} <WorkIcon /> {entry.employerName}
				<br /> <em>{entry.description}</em>
				<br />
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
				<br />
				<span>diagnose by {entry.specialist}</span>
			</div>
		</div>
	);
};

export default OccupationalHealthcareComp;
