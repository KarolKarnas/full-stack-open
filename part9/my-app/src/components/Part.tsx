import { CoursePart } from "../types";

// interface CoursePartBase {
// 	name: string;
// 	exerciseCount: number;
// }

// interface CoursePartBaseDescription extends CoursePartBase {
// 	description: string;
// }

// interface CoursePartBasic extends CoursePartBaseDescription {
// 	kind: 'basic';
// }

// interface CoursePartGroup extends CoursePartBase {
// 	groupProjectCount: number;
// 	kind: 'group';
// }

// interface CoursePartBackground extends CoursePartBaseDescription {
// 	backgroundMaterial: string;
// 	kind: 'background';
// }

// type CoursePart = CoursePartBasic | CoursePartGroup | CoursePartBackground;

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
					default:
						return assertNever(part);
				}
			})}
		</div>
	);
};

export default Part;
