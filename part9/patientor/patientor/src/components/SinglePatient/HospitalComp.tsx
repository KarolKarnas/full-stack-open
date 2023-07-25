import { HospitalEntry } from '../../types';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import LiquorIcon from '@mui/icons-material/Liquor';


interface EntryProps {
	entry: HospitalEntry;
}

const HospitalComp = ({ entry }: EntryProps) => {
	return (
		<div className='entry'>
			<p>
				{entry.date} <LocalHospitalIcon /> 
				<br /> <em>{entry.description}</em>
				<br />
        <span><strong>{entry.discharge.criteria}</strong> - {entry.discharge.date} - discharge date<LiquorIcon /></span>
        <br />
				<span>diagnose by {entry.specialist}</span>
			</p>
		</div>
	);
};


export default HospitalComp