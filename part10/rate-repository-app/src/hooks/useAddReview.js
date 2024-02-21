import { useMutation } from '@apollo/client';
import { ADD_REVIEW } from '../graphql/mutations';

const useAddReview = () => {
	const [createReview, result] = useMutation(ADD_REVIEW);


	const addReview = async (review) => {
		const response = await createReview({ variables: { review } });
		return response;
	};

	return [addReview, result];
};

export default useAddReview;
