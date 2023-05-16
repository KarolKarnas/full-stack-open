import { useState, useEffect } from 'react';
import personService from './services/persons';

const Notification = ({ successMessage, errorMessage }) => {
	if (successMessage === null && errorMessage === null) {
		return null;
	} else if (successMessage) {
		return <div className='success'>{successMessage}</div>;
	} else if (errorMessage) {
		return <div className='error'>{errorMessage}</div>;
	}
};

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

const PersonDetails = ({ person, handleDeletePerson }) => {
	return (
		<>
			<p>
				{person.name} {person.number}{' '}
				<button onClick={() => handleDeletePerson(person.id, person.name)}>
					Delete
				</button>
			</p>
		</>
	);
};

const Persons = ({ personsToShow, handleDeletePerson }) => {
	return personsToShow.map((person) => (
		<PersonDetails
			key={person.id}
			person={person}
			handleDeletePerson={handleDeletePerson}
		/>
	));
};

const App = () => {
	const [persons, setPersons] = useState([]);
	const [newName, setNewName] = useState('');
	const [newNumber, setNewNumber] = useState('');
	const [newFilter, setNewFilter] = useState('');
	const [personsToShow, setPersonsToShow] = useState(persons);
	const [successMessage, setSuccessMessage] = useState(null);
	const [errorMessage, setErrorMessage] = useState(null);

	useEffect(() => {
		personService.getAll().then((initialPersons) => {
			setPersons(initialPersons);
			setPersonsToShow(initialPersons);
		});
	}, []);
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

		if (indexNumber !== -1)
			return alert(`${newNumber} is already added to phonebook`);

		const newPerson = {
			name: newName,
			number: newNumber,
		};

		if (indexName !== -1) {
			window.confirm(
				`${newName} is already added to phonebook, replace the old number with a new one?`
			);
			const id = persons[indexName].id;
			personService
				.update(id, newPerson)
				.then(() => {
					personService.getAll().then((updatePersons) => {
						setPersons(updatePersons);
						setPersonsToShow(updatePersons);
						setSuccessMessage(`${newPerson.name} number edited`);

						setTimeout(() => {
							setSuccessMessage(null);
						}, 3000);
					});
				})
				.catch((error) => {
					setErrorMessage(
						`${newName} has already been removed from server`
					);
					setTimeout(() => {
						setErrorMessage(null);
					}, 3000);

					setTimeout(() => {
						personService.getAll().then((updatePersons) => {
							setPersons(updatePersons);
							setPersonsToShow(updatePersons);
						});
					}, 1000);
				});
			return;
		}

		personService.create(newPerson).then((returnedPerson) => {
			setPersons([...persons, returnedPerson]);
			setPersonsToShow([...persons, returnedPerson]);
			setNewName('');
			setNewNumber('');
			setNewFilter('');
			setSuccessMessage(`${newPerson.name} added`);

			setTimeout(() => {
				setSuccessMessage(null);
			}, 3000);
		});
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

	const handleDeletePerson = (id, name) => {
		if (window.confirm(`Delete ${name}?`)) {
			personService
				.deleteMe(id)
				.then(() => {
					personService.getAll().then((updatePersons) => {
						setPersons(updatePersons);
						setPersonsToShow(updatePersons);
						setSuccessMessage(`${name} deleted`);

						setTimeout(() => {
							setSuccessMessage(null);
						}, 3000);
					});
				})
				.catch((error) => {
					setErrorMessage(`${name} was already removed from server`);
					setTimeout(() => {
						setErrorMessage(null);
					}, 3000);

					setTimeout(() => {
						personService.getAll().then((updatePersons) => {
							setPersons(updatePersons);
							setPersonsToShow(updatePersons);
						});
					}, 1000);
					// setPersonsToShow(personsToShow.filter(person => person.id !== id))
				});
		}
	};

	return (
		<div>
			<h2>Phonebook</h2>
			<Notification
				successMessage={successMessage}
				errorMessage={errorMessage}
			/>
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
			<Persons
				personsToShow={personsToShow}
				handleDeletePerson={handleDeletePerson}
			/>
		</div>
	);
};

export default App;
