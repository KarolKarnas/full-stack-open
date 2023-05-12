import { useState } from 'react';

const Filter = ({ newFilter, handleChangeFilter }) => {
	return (
		<div>
			filter shown with:{' '}
			<input value={newFilter} onChange={handleChangeFilter} />
		</div>
	);
};

const PersonForm = ({
	newName,
	newNumber,
	handleSubmit,
	handleChangeName,
	handleChangeNumber,
}) => {
	return (
		<form onSubmit={handleSubmit}>
			<div>
				name: <input value={newName} onChange={handleChangeName} />
			</div>
			<div>
				number: <input value={newNumber} onChange={handleChangeNumber} />
			</div>
			<div>
				<button type='submit'>add</button>
			</div>
		</form>
	);
};

const PersonDetails = ({ person }) => {
	return (
		<p>
			{person.name} {person.number}
		</p>
	);
};

const Persons = ({ personsToShow }) => {
	return personsToShow.map((person) => (
		<PersonDetails key={person.id} person={person} />
	));
};

const App = () => {
	const [persons, setPersons] = useState([
		{ name: 'Arto Hellas', number: '040-123456', id: 1 },
		{ name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
		{ name: 'Dan Abramov', number: '12-43-234345', id: 3 },
		{ name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 },
	]);
	const [newName, setNewName] = useState('');
	const [newNumber, setNewNumber] = useState('');
	const [newFilter, setNewFilter] = useState('');
	const [personsToShow, setPersonsToShow] = useState(persons);

	const handleSubmit = (e) => {
		e.preventDefault();
		if (newName === '') return alert(`Can't add an empty name to phonebook`);

		if (newNumber === '')
			return alert(`Can't add an empty number to phonebook`);
		const indexName = persons.findIndex(
			(person) => person.name.toLowerCase() === newName.toLowerCase()
		);

		const indexNumber = persons.findIndex(
			(person) => person.number === newNumber
		);
		if (indexName !== -1)
			return alert(`${newName} is already added to phonebook`);
		if (indexNumber !== -1)
			return alert(`${newNumber} is already added to phonebook`);

		const newPerson = {
			name: newName,
			number: newNumber,
			id: persons.length + 1,
		};
		setPersons([...persons, newPerson]);
		setPersonsToShow([...persons, newPerson]);
		setNewName('');
		setNewNumber('');
		setNewFilter('');
	};

	const handleChangeName = (e) => {
		setNewName(e.target.value);
	};

	const handleChangeNumber = (e) => {
		setNewNumber(e.target.value);
	};

	const handleChangeFilter = (e) => {
		const filterValue = e.target.value;
		const filteredPersons = persons.filter((person) =>
			person.name.toLowerCase().includes(filterValue.toLowerCase())
		);
		setPersonsToShow(filteredPersons);
		setNewFilter(filterValue);
	};

	return (
		<div>
			<h2>Phonebook</h2>
			<Filter newFilter={newFilter} handleChangeFilter={handleChangeFilter} />
			<h2>add a new</h2>
			<PersonForm
				newName={newName}
				newNumber={newNumber}
				handleSubmit={handleSubmit}
				handleChangeName={handleChangeName}
				handleChangeNumber={handleChangeNumber}
			/>
			<h2>Numbers</h2>
			<Persons personsToShow={personsToShow} />
		</div>
	);
};

export default App;
