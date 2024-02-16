// import Constants from 'expo-constants';
import RepositoryList from './RepositoryList';
import { StyleSheet, View } from 'react-native';
import AppBar from './AppBar';
import { Route, Routes, Navigate } from 'react-router-native';
import SignIn from './SignIn';

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
			{/* <Text style={styles.logo}>Rate Repository Application</Text> */}
			<Routes>
        <Route path="/" element={<RepositoryList />} />
        <Route path="/signin" element={<SignIn />} />
				<Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
		</View>
	);
};

export default Main;