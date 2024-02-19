import { useQuery } from '@apollo/client';
import { ME } from '../graphql/queries';

const useMe = () => {
	const { data, loading, refetch } = useQuery(ME);
	return { data, loading, refetch };
};

export default useMe;
