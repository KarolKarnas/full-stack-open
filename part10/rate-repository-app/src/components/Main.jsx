// import Constants from 'expo-constants';
import RepositoryList from './RepositoryList';
import { Text, StyleSheet, View } from 'react-native';
import AppBar from './AppBar';

const styles = StyleSheet.create({
	container: {
		// marginTop: Constants.statusBarHeight + 10,
		flexGrow: 1,
		flexShrink: 1,
	},
	logo: {
		textTransform: 'uppercase',
    textAlign: 'center',
    fontWeight: 'bold'
	},
});

const Main = () => {
	return (
		<View style={styles.container}>
			<AppBar />
			<Text style={styles.logo}>Rate Repository Application</Text>
			<RepositoryList />
		</View>
	);
};

export default Main;
