import { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';

import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = () => {
	const {
		data,
		error,
		loading,
		refetch,
	} = useQuery(GET_REPOSITORIES, {
    fetchPolicy: 'cache-and-network',
    // Other options
  });
	// const [repositories, setRepositories] = useState();
	// const [loading, setLoading] = useState(false);

	// const fetchRepositories = async () => {
	// 	setLoading(true);

	// 	// Replace the IP address part with your own IP address!
	// 	const response = await fetch('http://192.168.0.9:5000/api/repositories');
	// 	const json = await response.json();

	// 	setLoading(false);
	// 	setRepositories(json);
	// };

	// useEffect(() => {
	// 	fetchRepositories();
	// }, []);
	// console.log('dsdasdsadasd')
	// console.log(repositories)

	return { data, loading, refetch };
};

export default useRepositories;
