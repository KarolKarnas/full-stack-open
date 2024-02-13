import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import { setContext } from 'apollo-link-context';

import {
	ApolloClient,
	InMemoryCache,
	ApolloProvider,
	HttpLink,
} from '@apollo/client';

const authLink = setContext((_, { headers }) => {
	const token = localStorage.getItem('library-user-token');
	// console.log(token)
	return {
		headers: {
			...headers,
			authorization: token ? `Bearer ${token}` : null,
		},
	};
});

const httpLink = new HttpLink({ uri: 'http://localhost:4000' });

const client = new ApolloClient({
	cache: new InMemoryCache(),
	link: authLink.concat(httpLink),
});
ReactDOM.createRoot(document.getElementById('root')).render(
	<ApolloProvider client={client}>
		<App />
	</ApolloProvider>
);
