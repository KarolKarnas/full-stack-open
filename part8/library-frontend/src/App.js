import { useEffect, useState } from 'react';
import Authors from './components/Authors';
import Books from './components/Books';
import NewBook from './components/NewBook';
import Notify from './components/Notify';
import LoginForm from './components/LoginForm';
import { useApolloClient } from '@apollo/client';
import Recommendations from './components/Recommendations';
// import { ALL_GENRES } from './queries';
// import { useQuery } from '@apollo/client';

const App = () => {
	const [page, setPage] = useState('authors');
	const [errorMessage, setErrorMessage] = useState(null);
	const [token, setToken] = useState(null);
	const client = useApolloClient();
	// const result = useQuery(ALL_GENRES);

	useEffect(() => {
		const storeToken = localStorage.getItem('library-user-token');
		if (storeToken) {
			setToken(storeToken);
		}
	}, []);

	const notify = (message) => {
		setErrorMessage(message);
		setTimeout(() => {
			setErrorMessage(null);
		}, 10000);
	};

	const logout = () => {
		setToken(null);
		localStorage.clear();
		client.resetStore();
	};

	return (
		<div>
			<div>
				<button onClick={() => setPage('authors')}>authors</button>
				<button onClick={() => setPage('books')}>books</button>
				{token ? (
					<>
						<button onClick={() => setPage('add')}>add book</button>
						<button onClick={() => setPage('recommendations')}>recommendations</button>
						<button onClick={() => logout()}>logout</button>
					</>
				) : (
					<button onClick={() => setPage('login')}>login</button>
				)}
			</div>
			<Notify errorMessage={errorMessage} setError={notify} />

			<Authors show={page === 'authors'} />

			<Books show={page === 'books'} />

			<NewBook show={page === 'add'} setError={notify} />
			{/* //here */}

			<LoginForm
				show={page === 'login'}
				setToken={setToken}
				setError={notify}
			/>
			<Recommendations show={page === 'recommendations'} />
		</div>
	);
};

export default App;
