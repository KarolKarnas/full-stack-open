import {
	FlatList,
	Text,
	View,
	StyleSheet,
	Pressable,
	Alert,
} from 'react-native';
import theme from '../theme';
import CustomText from './CustomText';
import useMe from '../hooks/useMe';
import { Link } from 'react-router-native';
import useDeleteReview from '../hooks/useDeleteReview';

const styles = StyleSheet.create({
	container: {
		display: 'flex',
		flexDirection: 'row',
		padding: 20,
	},
	avatar: {
		display: 'flex',
		justifyContent: 'center',
		alignContent: 'center',
		borderWidth: 2,
		borderColor: theme.colors.primary,
		width: 50,
		height: 50,
		borderRadius: 50 / 2,
	},
	rating: {
		color: theme.colors.primary,
		fontSize: 20,
		textAlign: 'center',
	},
	infoContainer: {
		marginLeft: 15,
		flex: 1,
	},
	pressable: {
		padding: theme.padding.paddingSmall,
		flexGrow: 0,
	},
	pressableView: {
		backgroundColor: theme.colors.primary,
	},
	pressableDelete: {
		backgroundColor: theme.colors.error,
	},
	btnContainer: {
		display: 'flex',
		flexDirection: 'row',
		gap: 10,
	},
});

const ReviewItem = ({ review, refetch }) => {
	const [removeReview] = useDeleteReview();
	const formatDate = (dateString) => {
		const dateObj = new Date(dateString);
		const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
		return dateObj.toLocaleDateString('en-US', options);
	};

	const createTwoButtonAlert = () =>
		Alert.alert('Alert Title', 'My Alert Msg', [
			{
				text: 'Cancel',
				onPress: () => console.log('cancel'),
				style: 'cancel',
			},
			{ text: 'DELETE', onPress: () => handleDeleteConfirm() },
		]);

	const handleDeleteConfirm = () => {
		removeReview(review.id);
		refetch()
	};

	return (
		<View testID='repositoryItem' style={styles.container}>
			<View style={styles.avatar}>
				<Text style={styles.rating}> {review.rating}</Text>
			</View>
			<View style={styles.infoContainer}>
				<CustomText fontWeight='bold' fontSize='subheading'>
					{review.repositoryId}
				</CustomText>
				<CustomText color='textSecondary'>
					{formatDate(review.createdAt)}
				</CustomText>

				<CustomText>{review.text}</CustomText>
				<View style={styles.btnContainer}>
					<Link
						style={[styles.pressable, styles.pressableView]}
						to={`/repository/${review.repositoryId}`}
					>
						<CustomText color='white' fontWeight='bold'>
							View repository
						</CustomText>
					</Link>

					<Pressable
						style={[styles.pressable, styles.pressableDelete]}
						onPress={createTwoButtonAlert}
					>
						<CustomText color='white' fontWeight='bold'>
							Delete
						</CustomText>
					</Pressable>
				</View>
			</View>
		</View>
	);
};

const MyReviews = () => {
	const { data, loading, refetch } = useMe({ includeReviews: true });

	if (loading)
		return (
			<View>
				<Text>Loading</Text>
			</View>
		);

	const reviewsNodes = data
		? data.me.reviews.edges.map((edge) => edge.node)
		: [];

	return (
		<FlatList
			data={reviewsNodes}
			renderItem={({ item }) => <ReviewItem review={item} refetch={refetch} />}
			keyExtractor={({ id }) => id}
		/>
	);
};

export default MyReviews;
