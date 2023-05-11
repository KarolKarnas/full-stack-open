const Header = ({ course }) => {
	return <h1>{course.name}</h1>;
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

const Part = ({ name, exercises }) => {
	return (
		<p>
			{name} {exercises}{' '}
		</p>
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

const App = () => {
	const course = {
		id: 1,
		name: 'Half Stack application development',
		parts: [
			{
				name: 'Fundamentals of React',
				exercises: 10,
				id: 1,
			},
			{
				name: 'Using props to pass data',
				exercises: 7,
				id: 2,
			},
			{
				name: 'State of a component',
				exercises: 14,
				id: 3,
			},
			{
				name: 'Redux',
				exercises: 11,
				id: 4,
			},
		],
	};

	return <Course course={course} />;
};

export default App;
