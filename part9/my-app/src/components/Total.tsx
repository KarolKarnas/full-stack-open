interface CourseParts {
	name: string;
	exerciseCount: number;
}

interface ContentProps {
	courseParts: CourseParts[];
}

const Total = (props: ContentProps) => {
	return (
		<div>
			<p>
				Number of exercises{' '}
				{props.courseParts.reduce((acc, curr) => curr.exerciseCount + acc, 0)}
			</p>
		</div>
	);
};
export default Total;
