import { Entry, Diagnosis } from '../../types';
import HealthCheckComp from './HealthCheckComp';
import OccupationalHealthcareComp from './OccupationalHealthcareComp';

import HospitalComp from './HospitalComp';

interface EntryProps {
	entries: Entry[];
	diagnoses: Diagnosis[];
}

const assertNever = (value: never): never => {
	throw new Error(
		`Unhandled discriminated union member: ${JSON.stringify(value)}`
	);
};

const EntryComp = ({ entries, diagnoses }: EntryProps) => {
	// console.log(entries);
	// console.log(diagnoses);
	return (
		<>
			{entries.map((entry) => {
				switch (entry.type) {
					case 'HealthCheck':
						return <HealthCheckComp diagnoses={diagnoses} key={entry.id} entry={entry} />;
					case 'Hospital':
						return <HospitalComp diagnoses={diagnoses} key={entry.id} entry={entry}/>
					case 'OccupationalHealthcare':
						return <OccupationalHealthcareComp diagnoses={diagnoses} key={entry.id} entry={entry}/>
					default:
						return assertNever(entry);
				}
			})}
		</>
	);
};
export default EntryComp;

// return (
//   <div key={entry.id}>
//     <p>
//       {entry.date} {entry.description}
//     </p>
//     {entry.diagnosisCodes && (
//       <ul>
//         {' '}
//         {entry.diagnosisCodes.map((dc) => {
//   const diagnosis = diagnoses.find(diagnosis => dc === diagnosis.code)
//           return (
//             <li key={dc}>{dc} - {diagnosis?.name}</li>
//           );
//         })}
//       </ul>
//     )}
//   </div>
// );
