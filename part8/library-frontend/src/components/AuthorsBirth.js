import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ALL_AUTHORS, EDIT_BIRTH } from '../queries';

const AuthorsBirth = ({ authors }) => {
	const [name, setName] = useState(authors[0].name);
	const [setBornTo, setSetBornTo] = useState(1987);
	// console.log(authors)
	const [editBirth] = useMutation(EDIT_BIRTH, {
		refetchQueries: [{ query: ALL_AUTHORS }],
	});

	const submit = async (event) => {
		event.preventDefault();

		editBirth({ variables: { name, setBornTo } });

		setName('');
		setSetBornTo(1987);
	};

	if (!authors) {
		return <div>Loading...</div>;
	}

	return (
		<form onSubmit={submit}>
			<div>
				name select
				<select
					value={name}
					onChange={(e) => setName(e.target.value)}
					name='nameSelect'
					id=''
				>
					{authors.map((author, index) => (
						<option value={author.name} key={index}>
							{author.name}
						</option>
					))}
				</select>
			</div>
			{/* <div>
				name
				<input value={name} onChange={({ target }) => setName(target.value)} />
			</div> */}
			<div>
				born
				<input
					value={setBornTo}
					onChange={({ target }) => setSetBornTo(+target.value)}
				/>
			</div>
			<button type='submit'>update author</button>
		</form>
	);
};
export default AuthorsBirth;
