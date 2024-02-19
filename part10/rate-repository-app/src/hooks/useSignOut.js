import { useApolloClient } from '@apollo/client';
import useAuthStorage from './useAuthStorage';

const useSignOut = () => {
	const authStorage = useAuthStorage();
	const apolloClient = useApolloClient();
	const signOut = async () => {
		// console.log('removing token');
		await authStorage.removeAccessToken();
		apolloClient.resetStore();
	};

	return [signOut];
};

export default useSignOut;
