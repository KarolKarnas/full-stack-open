const Header = ({ course }) => {
	return <h2>{course.name}</h2>;
};

const Part = ({ name, exercises }) => {
	return (
		<p>
			{name} {exercises}{' '}
		</p>
	);
};

const Total = ({ sumOfExercises }) => {
	return <strong>Total of {sumOfExercises} exercises</strong>;
};

const Content = ({ course }) => {
	const sumOfExercises = course.parts.reduce(
		(acc, currentPart) => acc + currentPart.exercises,
		0
	);
	return (
		<div>
			{course.parts.map((part) => (
				<Part key={part.id} name={part.name} exercises={part.exercises} />
			))}
			<Total sumOfExercises={sumOfExercises} />
		</div>
	);
};

const Course = ({ course }) => {
	return (
		<>
			<Header course={course} />
			<Content course={course} />
		</>
	);
};

export default Course