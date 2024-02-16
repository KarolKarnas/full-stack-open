import { View, StyleSheet, FlatList } from 'react-native';
import Constants from 'expo-constants';
import theme from '../theme';
import AppBarTab from './AppBarTab';

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
		text: 'press me',
	},
	{
		id: '2',
		text: 'impress you',
	},
	{
		id: '3',
		text: 'god bless you',
	},
];

const ItemSeparator = () => <View style={styles.separator} />;

const AppBar = () => {
	return (
		<View style={styles.container}>
	
				<FlatList
					style={styles.menu}
					data={tabs}
          horizontal
					renderItem={({ item }) => <AppBarTab item={item} />}
					keyExtractor={(item) => item.id}
					ItemSeparatorComponent={ItemSeparator}
				/>
		</View>
	);
};

export default AppBar;
