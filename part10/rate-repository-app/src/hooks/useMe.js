import { useQuery } from '@apollo/client';
import { ME } from '../graphql/queries';

const useMe = (variables) => {
	const { data, loading, refetch } = useQuery(ME, {
		fetchPolicy: 'cache-and-network',
		variables,
	});
	return { data, loading, refetch };
};

export default useMe;
