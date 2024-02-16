import { StyleSheet, Pressable } from 'react-native';
import theme from '../theme';
import CustomText from './CustomText';

const styles = StyleSheet.create({
	pressable: {
		padding: theme.padding.paddingSmall,
		backgroundColor: theme.colors.textSecondary,
		flexGrow: 0,
	},
});

const AppBarTab = ({ item }) => {
	const onPressFunction = () => {
		console.log(item.text);
	};
	return (
		<Pressable style={styles.pressable} onPress={onPressFunction}>
			<CustomText color='white' fontWeight='bold'>
				{item.text}
			</CustomText>
		</Pressable>
	);
};

export default AppBarTab;
