import { useQuery } from '@apollo/client';

import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = (variables) => {
	// console.log(variables)
	const { data, error, loading, refetch } = useQuery(GET_REPOSITORIES, {
		fetchPolicy: 'cache-and-network',
		variables,
	});

	// console.log(data)

	return { repositories: data?.repositories, loading, refetch };
};

export default useRepositories;
