import Main from './src/components/Main';
import { NativeRouter } from 'react-router-native';
import { StatusBar } from 'expo-status-bar';
import { ApolloProvider } from '@apollo/client';
import createApolloClient from './src/utils/apolloClient';
import AuthStorage from './src/utils/authStorage';
import AuthStorageContext from './src/contexts/AuthStorageContext';

// import Constants from 'expo-constants';

const authStorage = new AuthStorage();
const apolloClient = createApolloClient(authStorage);

const App = () => {
	// console.log(Constants.expoConfig.extra);
	return (
		<>
			<NativeRouter>
				<ApolloProvider client={apolloClient}>
					<AuthStorageContext.Provider value={authStorage}>
						<Main />
					</AuthStorageContext.Provider>
				</ApolloProvider>
			</NativeRouter>
			<StatusBar style='auto' />
		</>
	);
};

export default App;
