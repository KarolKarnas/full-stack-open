import { Diagnosis, HealthCheckEntry } from '../../types';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import FavoriteIcon from '@mui/icons-material/Favorite';

interface EntryProps {
	entry: HealthCheckEntry;
	diagnoses: Diagnosis[];
}

const HealthCheckComp = ({ entry, diagnoses }: EntryProps) => {
	return (
		<div className='entry'>
			<div>
				{entry.date} <MedicalServicesIcon />
				<br /> <em>{entry.description}</em>
				<br />{' '}
				{entry.healthCheckRating === 0 ? (
					<FavoriteIcon style={{ color: 'yellow' }} />
				) : entry.healthCheckRating === 1 ? (
					<FavoriteIcon style={{ color: 'green' }} />
				) : entry.healthCheckRating === 2 ? (
					<FavoriteIcon style={{ color: 'blue' }} />
				) : entry.healthCheckRating === 3 ? (
					<FavoriteIcon style={{ color: 'black' }} />
				) : null}
        <br />
				{entry.diagnosisCodes ? <span>diagnose codes</span> : null}
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

export default HealthCheckComp;
