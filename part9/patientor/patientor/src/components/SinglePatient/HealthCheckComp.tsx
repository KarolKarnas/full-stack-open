import { HealthCheckEntry } from '../../types';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import FavoriteIcon from '@mui/icons-material/Favorite';

interface EntryProps {
	entry: HealthCheckEntry;
}

const HealthCheckComp = ({ entry }: EntryProps) => {
	return (
		<div className='entry'>
			<p>
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
        <span>diagnose by {entry.specialist}</span>
			</p>
		</div>
	);
};

export default HealthCheckComp;
