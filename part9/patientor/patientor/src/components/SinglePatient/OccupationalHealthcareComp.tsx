import { OccupationalHealthcareEntry } from '../../types';
import WorkIcon from '@mui/icons-material/Work';


interface EntryProps {
	entry: OccupationalHealthcareEntry;
}

const OccupationalHealthcareComp = ({ entry }: EntryProps) => {
	return (
		<div className='entry'>
			<p>
				{entry.date} <WorkIcon /> {entry.employerName}
				<br /> <em>{entry.description}</em>
				<br />
				<span>diagnose by {entry.specialist}</span>
			</p>
		</div>
	);
};

export default OccupationalHealthcareComp;
