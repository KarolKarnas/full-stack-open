import React from 'react';
import { View, Text, StyleSheet, Image, Button } from 'react-native';
import theme from '../theme';
import CustomText from './CustomText';
import * as Linking from 'expo-linking';

const styles = StyleSheet.create({
	container: {
		display: 'flex',
		flexDirection: 'row',
		padding: 20,
	},
	avatar: {
		width: 40,
		height: 40,
		borderRadius: 25,
	},
	infoContainer: {
		marginLeft: 15,
		flex: 1,
	},
	language: {
		backgroundColor: theme.colors.primary,
		color: 'white',
		alignSelf: 'flex-start',
		padding: 5,
		borderRadius: 5,
		marginTop: 5,
	},
	statsContainer: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginTop: 10,
	},
	stat: {
		alignItems: 'center',
	},
});

const RepositoryItem = ({ item, button }) => {
	const formatThousandNumber = (num) => {
		if (num > 1000) {
			return `${(num / 1000).toFixed(1)}k`;
		}
		return num;
	};

	// console.log(item)

	return (
		<View testID='repositoryItem' style={styles.container}>
			<Image source={{ uri: item.ownerAvatarUrl }} style={styles.avatar} />
			<View style={styles.infoContainer}>
				<CustomText fontWeight='bold' fontSize='subheading'>
					{item.fullName}
				</CustomText>
				<CustomText color='textSecondary'>{item.description}</CustomText>
				<Text style={styles.language}>{item.language}</Text>
				<View style={styles.statsContainer}>
					<View style={styles.stat}>
						<CustomText fontWeight='bold'>
							{formatThousandNumber(item.stargazersCount)}
						</CustomText>
						<CustomText color='textSecondary'>Stars</CustomText>
					</View>
					<View style={styles.stat}>
						<CustomText fontWeight='bold'>
							{formatThousandNumber(item.forksCount)}
						</CustomText>
						<CustomText color='textSecondary'>Forks</CustomText>
					</View>
					<View style={styles.stat}>
						<CustomText fontWeight='bold'>
							{formatThousandNumber(item.reviewCount)}
						</CustomText>
						<CustomText color='textSecondary'>Reviews</CustomText>
					</View>
					<View style={styles.stat}>
						<CustomText fontWeight='bold'>
							{formatThousandNumber(item.ratingAverage)}
						</CustomText>
						<CustomText color='textSecondary'>Rating</CustomText>
					</View>
				</View>
				{button ? (
					<Button
						onPress={() => Linking.openURL(item.url)}
						title='Git Repooo'
					/>
				) : null}
			</View>
		</View>
	);
};

export default RepositoryItem;
