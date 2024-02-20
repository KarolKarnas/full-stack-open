import { useMutation } from '@apollo/client';
import useAuthStorage from './useAuthStorage';
import { useApolloClient } from '@apollo/client';

import { ADD_REVIEW } from '../graphql/mutations';

const useAddReview = () => {
	// const authStorage = useAuthStorage();
	const [createReview, result] = useMutation(ADD_REVIEW);
	// const apolloClient = useApolloClient();

	const addReview = async (review) => {
		const response = await createReview({ variables: { review } });

		// await authStorage.setAccessToken(response.data?.authenticate?.accessToken);
		// apolloClient.resetStore();


		return response;
	};

	return [addReview, result];
};

export default useAddReview;
