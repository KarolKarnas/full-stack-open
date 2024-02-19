import { useMutation } from '@apollo/client';
import useAuthStorage from '../hooks/useAuthStorage';
import { useApolloClient } from '@apollo/client';

import { AUTHENTICATE } from '../graphql/mutations';

const useSignIn = () => {
	const authStorage = useAuthStorage();
	const [authenticate, result] = useMutation(AUTHENTICATE);
	const apolloClient = useApolloClient();

	const signIn = async ({ username, password }) => {
		const response = await authenticate({ variables: { username, password } });

		await authStorage.setAccessToken(response.data?.authenticate?.accessToken);
		apolloClient.resetStore();


		return response;
	};

	return [signIn, result];
};

export default useSignIn;
