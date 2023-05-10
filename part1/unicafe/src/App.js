import { useState } from 'react';

const Button = ({ handleClick, text }) => {
	return <button onClick={handleClick}>{text}</button>;
};

const StatisticLine = ({text, value}) => {
	return (
		<>{text} {value} <br /></>
	)
}

const Statistics = ({ good, neutral, bad, total, average, positive }) => {
	return total === 0 ? (
		<p>No feedback given</p>
	) : (
		<div>
			<StatisticLine text={'good'} value={good}/>
			<StatisticLine text={'neutral'} value={neutral}/>
			<StatisticLine text={'bad'} value={bad}/>
			<StatisticLine text={'total'} value={total}/>
			<StatisticLine text={'average'} value={average}/>
			<StatisticLine text={'positive'} value={positive}/>
		</div>
	);
};

const App = () => {
	const [good, setGood] = useState(0);
	const [neutral, setNeutral] = useState(0);
	const [bad, setBad] = useState(0);
	const [allReviews, setAllReviews] = useState([]);

	const incrementGood = () => {
		// setAllReviews(allReviews.concat(1));
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

	const average =
		allReviews.length === 0
			? 'N/A'
			: allReviews.reduce((acc, current) => acc + current, 0) /
			  allReviews.length;

	const positive =
		allReviews.length === 0 ? 'N/A' : `${(good / allReviews.length) * 100} %`;

	return (
		<div>
			<h2>give feedback</h2>
			<Button handleClick={incrementGood} text={'good'} />
			<Button handleClick={incrementNeutral} text={'neutral'} />
			<Button handleClick={incrementBad} text={'bad'} />
			<h2>statistics</h2>
			<Statistics
				good={good}
				neutral={neutral}
				bad={bad}
				total={allReviews.length}
				average={average}
				positive={positive}
			/>
		</div>
	);
};

export default App;
