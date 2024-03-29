import { View, StyleSheet, FlatList } from 'react-native';
import Constants from 'expo-constants';
import theme from '../theme';
import AppBarTab from './AppBarTab';
import useMe from '../hooks/useMe';

const styles = StyleSheet.create({
	container: {
		paddingTop: Constants.statusBarHeight,
		backgroundColor: theme.colors.transparent,
	},
	menu: {
		// display: 'flex',
		backgroundColor: theme.colors.transparentMenu,
		// flexDirection: 'row',
		// gap: 5,
	},
	separator: {
		width: 5,
		// backgroundColor: theme.colors.white,
	},
});

const tabs = [
	{
		id: '1',
		text: 'Repositories',
		path: '/',
	},
	{
		id: '3',
		text: 'Sign out',
		// path: '/signout',
	},
	{
		id: '4',
		text: 'Add review',
		path: '/addreview',
	},
	{
		id: '6',
		text: 'My reviews',
		path: '/myreviews',
	},
];
const tabs_logout = [
	{
		id: '1',
		text: 'Repositories',
		path: '/',
	},
	{
		id: '2',
		text: 'Sign In',
		path: '/signin',
	},
	{
		id: '5',
		text: 'Sign Up',
		path: '/signup',
	},
];

const ItemSeparator = () => <View style={styles.separator} />;

const AppBar = () => {
	const { data, loading } = useMe();

	// console.log(data);

	return (
		<View style={styles.container}>
			<FlatList
				style={styles.menu}
				data={!loading && data.me ? tabs : tabs_logout}
				horizontal
				renderItem={({ item }) => <AppBarTab item={item} />}
				keyExtractor={(item) => item.id}
				ItemSeparatorComponent={ItemSeparator}
			/>
		</View>
	);
};

export default AppBar;
