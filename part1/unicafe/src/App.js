import { useState } from 'react';

const Button = ({ handleClick, text }) => {
	return <button onClick={handleClick}>{text}</button>;
};

const Stats = ({ label, stats }) => {
	return (
		<p>
			{label} {stats}
		</p>
	);
};

const App = () => {
	const [good, setGood] = useState(0);
	const [neutral, setNeutral] = useState(0);
	const [bad, setBad] = useState(0);
	const [allReviews, setAllReviews] = useState([]);

	const incrementGood = () => {
		setAllReviews((prevReviews) => [...prevReviews, 1]);
		setGood(good + 1);
	};
	const incrementNeutral = () => {
		setAllReviews((prevReviews) => [...prevReviews, 0]);
		setNeutral(neutral + 1);
	};
	const incrementBad = () => {
		setAllReviews((prevReviews) => [...prevReviews, -1]);
		setBad(bad + 1);
	};

	return (
		<div>
			<h2>give feedback</h2>
			<Button handleClick={incrementGood} text={'good'} />
			<Button handleClick={incrementNeutral} text={'neutral'} />
			<Button handleClick={incrementBad} text={'bad'} />
			<h2>statistics</h2>
			<Stats label={'good'} stats={good} />
			<Stats label={'neutral'} stats={neutral} />
			<Stats label={'bad'} stats={bad} />
			<Stats label={'total'} stats={allReviews.length} />
			<Stats
				label={'average'}
				stats={
					allReviews.length === 0
						? 'N/A'
						: allReviews.reduce((acc, current) => acc + current, 0) /
						  allReviews.length
				}
			/>
			<Stats
				label={'positive'}
				stats={
					allReviews.length === 0
						? 'N/A'
						: `${(good / allReviews.length) * 100} %`
				}
			/>
		</div>
	);
};

export default App;
