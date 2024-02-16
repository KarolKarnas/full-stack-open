import { StyleSheet } from 'react-native';
import theme from '../theme';
import CustomText from './CustomText';
import { Link } from 'react-router-native';

const styles = StyleSheet.create({
	pressable: {
		padding: theme.padding.paddingSmall,
		backgroundColor: theme.colors.textSecondary,
		flexGrow: 0,
	},
});

const AppBarTab = ({ item }) => {
	// const onPressFunction = () => {
	// 	console.log(item.text);
	// };
	return (
		<Link style={styles.pressable} to={item.path}>
			{/* <Pressable style={styles.pressable} onPress={onPressFunction}> */}
				<CustomText color='white' fontWeight='bold'>
					{item.text}
				</CustomText>
			{/* </Pressable> */}
		</Link>
	);
};

export default AppBarTab;
