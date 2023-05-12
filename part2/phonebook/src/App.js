import { useState } from 'react';

const App = () => {
	const [persons, setPersons] = useState([
		{ name: 'Arto Hellas' },
		{ name: 'Ada Lovelace' },
	]);
	const [newName, setNewName] = useState('');

	const handleSubmit = (e) => {
		e.preventDefault();
    const newPerson = {name: newName}
		setPersons([...persons, newPerson]);
		setNewName('');
	};

	const handleChangeName = (e) => {
		setNewName(e.target.value);
	};
	return (
		<div>
			<h2>Phonebook</h2>
			<form onSubmit={handleSubmit}>
				<div>
					name: <input value={newName} onChange={handleChangeName} />
				</div>
				<div>
					<button type='submit'>add</button>
				</div>
			</form>
			<h2>Numbers</h2>
			{persons.map((person) => (
				<p key={person.name}>{person.name}</p>
			))}
		</div>
	);
};

export default App;
