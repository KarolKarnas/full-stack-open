import { useEffect, useState } from 'react';
import Authors from './components/Authors';
import Books from './components/Books';
import NewBook from './components/NewBook';
import Notify from './components/Notify';
import LoginForm from './components/LoginForm';
import { useApolloClient, useQuery, useSubscription } from '@apollo/client';
import Recommendations from './components/Recommendations';
import { ALL_BOOKS, BOOK_ADDED } from './queries';
// import { ALL_GENRES } from './queries';
// import { useQuery } from '@apollo/client';

// function that takes care of manipulating cache
export const updateCache = (cache, query, addedBook) => {
	// helper that is used to eliminate saving same person twice
	const uniqByName = (a) => {
		let seen = new Set();
		return a.filter((item) => {
			let k = item.name;
			return seen.has(k) ? false : seen.add(k);
		});
	};

	cache.updateQuery(query, ({ allBooks }) => {
		return {
			allBooks: uniqByName(allBooks.concat(addedBook)),
		};
	});
};

const App = () => {
	const [page, setPage] = useState('authors');
	const [errorMessage, setErrorMessage] = useState(null);
	const [token, setToken] = useState(null);
	const client = useApolloClient();
	const result = useQuery(ALL_BOOKS);
	

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


	useSubscription(BOOK_ADDED, {
		onData: ({ data, client }) => {
			const addedBook = data.data.bookAdded;
			notify(`${addedBook.title} added`);
			updateCache(client.cache, { query: ALL_BOOKS }, addedBook);
		},
	});

	useEffect(() => {
		const storeToken = localStorage.getItem('library-user-token');
		if (storeToken) {
			setToken(storeToken);
		}
	}, []);


	return (
		<div>
			<div>
				<button onClick={() => setPage('authors')}>authors</button>
				<button onClick={() => setPage('books')}>books</button>
				{token ? (
					<>
						<button onClick={() => setPage('add')}>add book</button>
						<button onClick={() => setPage('recommendations')}>
							recommendations
						</button>
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
