import { StyleSheet, Pressable } from 'react-native';
import theme from '../theme';
import CustomText from './CustomText';
import { Link } from 'react-router-native';
import useSignOut from '../hooks/useSignOut';

const styles = StyleSheet.create({
	pressable: {
		padding: theme.padding.paddingSmall,
		backgroundColor: theme.colors.textSecondary,
		flexGrow: 0,
	},
});

const AppBarTab = ({ item }) => {
	const [singOut] = useSignOut();

	return item.text === 'Sign out' ? (
		<Pressable style={styles.pressable} onPress={singOut}>
			<CustomText color='white' fontWeight='bold'>
				{item.text}
			</CustomText>
		</Pressable>
	) : (
		<Link style={styles.pressable} to={item.path}>
			<CustomText color='white' fontWeight='bold'>
				{item.text}
			</CustomText>
		</Link>
	);
};

export default AppBarTab;
