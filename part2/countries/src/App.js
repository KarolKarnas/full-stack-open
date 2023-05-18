import { useState, useEffect } from 'react';
import axios from 'axios';

const Country = ({ name }) => {
	return <li>{name}</li>;
};

const SingleCountry = ({ name, capital, area, languages, flag, altFlag }) => {
	return (
		<>
			<h2>{name}</h2>
			<p>capital {capital}</p>
			<p>area {area}</p>
			<h5>languages:</h5>
			<ul>
				{Object.values(languages).map((language) => (
					<li key={language}>{language}</li>
				))}
			</ul>
			<img
				style={{ maxWidth: '200px', border: '2px solid black' }}
				src={flag}
				alt={altFlag}
			/>
		</>
	);
};

const App = () => {
	const [countries, setCountries] = useState([]);
	const [countriesToShow, setCountriesToShow] = useState([]);

	useEffect(() => {
		axios.get('https://restcountries.com/v3.1/all').then((response) => {
			setCountries(response.data);
		});
	}, []);

	const handleSearch = (e) => {
		const filtered = countries.filter((country) =>
			country.name.common.toLowerCase().includes(e.target.value.toLowerCase())
		);

		setCountriesToShow(filtered);
	};

	return (
		<>
			<div>
				find countries <input onChange={handleSearch} />
			</div>

			{countriesToShow.length > 10 ? (
				'To many matches, specify another filter'
			) : countriesToShow.length === 1 ? (
				<SingleCountry
					name={countriesToShow[0].name.common}
					capital={countriesToShow[0].capital}
					area={countriesToShow[0].area}
					languages={countriesToShow[0].languages}
					flag={countriesToShow[0].flags.svg}
					altFlag={countriesToShow[0].flags.alt}
				/>
			) : (
				<ul>
					{countriesToShow.map((country) => (
						<Country key={country.idd.suffixes[0]} name={country.name.common} />
					))}
				</ul>
			)}
		</>
	);
};

export default App;
