import { useState } from 'react';

const App = () => {
	const [persons, setPersons] = useState([
		{ name: 'Arto Hellas', number: '111-111-111' },
		{ name: 'Ada Lovelace', number: '222-222-222' },
	]);
	const [newName, setNewName] = useState('');
	const [newNumber, setNewNumber] = useState('');

	const handleSubmit = (e) => {
		e.preventDefault();
		if (newName === '') return alert(`Can't add an empty name to phonebook`);

		if (newNumber === '') return alert(`Can't add an empty number to phonebook`);
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

		const newPerson = { name: newName, number: newNumber };
		setPersons([...persons, newPerson]);
		setNewName('');
		setNewNumber('');
	};

	const handleChangeName = (e) => {
		setNewName(e.target.value);
	};

	const handleChangeNumber = (e) => {
		setNewNumber(e.target.value);
	};
	return (
		<div>
			<h2>Phonebook</h2>
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
			<h2>Numbers</h2>
			{persons.map((person) => (
				<p key={person.name}>
					{person.name} {person.number}
				</p>
			))}
		</div>
	);
};

export default App;
