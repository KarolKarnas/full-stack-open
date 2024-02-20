import { useQuery } from '@apollo/client';
import { FlatList, Text, View, StyleSheet } from 'react-native';
import theme from '../theme';
import CustomText from './CustomText';
import { useParams } from 'react-router-native';
import { GET_REPOSITORY, GET_REVIEWS } from '../graphql/queries';
import RepositoryItem from './RepositoryItem';

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
    textAlign: 'center'
  },
	infoContainer: {
		marginLeft: 15,
		flex: 1,
    
	},
});

const RepositoryInfo = ({ repository }) => {
	return <RepositoryItem item={repository.repository} button />;
};

const ReviewItem = ({ review }) => {
	// console.log(review);
	const formatDate = (dateString) => {
		const dateObj = new Date(dateString);
		const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
		return dateObj.toLocaleDateString('en-US', options);
	};
	return (
		<View testID='repositoryItem' style={styles.container}>
      <View style={styles.avatar}>

			<Text style={styles.rating}> {review.rating}</Text>

      </View>
			<View style={styles.infoContainer}>
				<CustomText fontWeight='bold' fontSize='subheading'>
					{review.user.username}
				</CustomText>
				<CustomText color='textSecondary'>
					{formatDate(review.createdAt)}
				</CustomText>

				<CustomText>{review.text}</CustomText>
			</View>
		</View>
	);
};

const SingleRepository = () => {
	const { repoId } = useParams();

  // console.log(repoId)

	const { data: reviewsData, loading: loadingReviews } = useQuery(GET_REVIEWS, {
		variables: { repositoryId: repoId },
		fetchPolicy: 'cache-and-network',
	});

	const { data: repoData, loading: loadingRepo } = useQuery(GET_REPOSITORY, {
		variables: { repositoryId: repoId },
		fetchPolicy: 'cache-and-network',
	});

	if (loadingRepo || loadingReviews)
		return (
			<View>
				<Text>Loading</Text>
			</View>
		);

	const reviewsNodes = reviewsData
		? reviewsData.repository.reviews.edges.map((edge) => edge.node)
		: [];

	return (
		<FlatList
			data={reviewsNodes}
			renderItem={({ item }) => <ReviewItem review={item} />}
			keyExtractor={({ id }) => id}
			ListHeaderComponent={() => <RepositoryInfo repository={repoData} />}
			// ...
		/>
	);
};

export default SingleRepository;
