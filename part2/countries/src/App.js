import { useState, useEffect } from 'react';
import axios from 'axios';

const Country = ({ name, index, handleShowView, countries }) => {
	return (
		<li>
			{name}{' '}
			<button onClick={() => handleShowView(index)}>
				{countries[index].show ? 'Hide' : 'Show'}
			</button>
			{countries[index].show ? (
				<CountryView
					name={countries[index].name.common}
					capital={countries[index].capital}
					area={countries[index].area}
					languages={countries[index].languages}
					flag={countries[index].flags.svg}
					altFlag={countries[index].flags.alt}
				/>
			) : null}
		</li>
	);
};

const CountryView = ({ name, capital, area, languages, flag, altFlag }) => {
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
			const countriesWithIndex = response.data.map((country, index) => ({
				...country,
				index: index,
				show: false,
			}));
			setCountries(countriesWithIndex);
		});
	}, []);

	const handleSearch = (e) => {
		const filteredCountries = countries.filter((country) =>
			country.name.common.toLowerCase().includes(e.target.value.toLowerCase())
		);
		setCountriesToShow(filteredCountries);
	};

	const handleShowView = (index) => {
		const updatedCountries = [...countries];
		updatedCountries[index] = {
			...updatedCountries[index],
			show: !updatedCountries[index].show,
		};
		setCountries(updatedCountries);
	};

	return (
		<>
			<div>
				find countries <input onChange={handleSearch} />
			</div>

			{countriesToShow.length > 10 ? (
				'To many matches, specify another filter'
			) : countriesToShow.length === 1 ? (
				<CountryView
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
						<Country
							key={country.name.common}
							name={country.name.common}
							index={country.index}
							handleShowView={handleShowView}
							countries={countries}
						/>
					))}
				</ul>
			)}
		</>
	);
};

export default App;
