import { Diagnosis, HospitalEntry } from '../../types';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import LiquorIcon from '@mui/icons-material/Liquor';


interface EntryProps {
	entry: HospitalEntry;
	diagnoses: Diagnosis[];
}

const HospitalComp = ({ entry, diagnoses }: EntryProps) => {
	return (
		<div className='entry'>
			<div>
				{entry.date} <LocalHospitalIcon /> 
				<br /> <em>{entry.description}</em>
				<br />
        <span><strong>{entry.discharge.criteria}</strong> - {entry.discharge.date} - discharge date<LiquorIcon /></span>
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


export default HospitalComp