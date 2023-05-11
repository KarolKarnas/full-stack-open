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

const App = () => {

const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

	return (
		<div>
			<h1>Web development curriculum</h1>
					{courses.map((course) => (
				<Course key={course.id} course={course} />
			))}
		</div>
	)
};

export default App;
