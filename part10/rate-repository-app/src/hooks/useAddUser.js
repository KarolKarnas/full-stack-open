import { useMutation } from '@apollo/client';
import { ADD_USER } from '../graphql/mutations';


const useAddUser = () => {
	const [createUser, result] = useMutation(ADD_USER);

	const addUser = async (user) => {
		const response = await createUser({ variables: { user } });
		return response;
	};

	return [addUser, result];
};

export default useAddUser;
