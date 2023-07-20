import { CoursePart } from '../types';

interface ContentProps {
	courseParts: CoursePart[];
}

const assertNever = (value: never): never => {
	throw new Error(
		`Unhandled discriminated union member: ${JSON.stringify(value)}`
	);
};

const Part = (props: ContentProps) => {
	return (
		<div>
			{props.courseParts.map((part) => {
				switch (part.kind) {
					case 'basic':
						return (
							<div className='part' key={part.name}>
								<strong>
									{part.name} {part.exerciseCount}
								</strong>{' '}
								<br /> <em>{part.description}</em>
							</div>
						);
					case 'group':
						return (
							<div className='part' key={part.name}>
								<strong>
									{part.name} {part.exerciseCount}
								</strong>{' '}
								<br /> project exercises {part.groupProjectCount}
							</div>
						);
					case 'background':
						return (
							<div className='part' key={part.name}>
								<strong>
									{part.name} {part.exerciseCount}
								</strong>{' '}
								<br />
								<em>{part.description}</em>
								<br />
								{part.backgroundMaterial}
							</div>
						);
					case 'special':
						return (
							<div className='part' key={part.name}>
								<strong>
									{part.name} {part.exerciseCount}
								</strong>{' '}
								<br />
								<em>{part.description}</em>
								<br />
								required skills:{' '}
								{part.requirements.map((requirement, index, arr) => (
									<span key={index}>
										{index === arr.length - 1
											? requirement
											: `${requirement}, `}
									</span>
								))}
							</div>
						);
					default:
						return assertNever(part);
				}
			})}
		</div>
	);
};

export default Part;
